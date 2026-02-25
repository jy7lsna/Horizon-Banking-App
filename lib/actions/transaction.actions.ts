'use server';

import { prisma } from '@/lib/db';
import { plaidClient } from '../plaid';
import { parseStringify } from '../utils';
import { revalidatePath } from 'next/cache';

export const getTransactions = async ({
    userId,
    limit = 10,
    page = 1,
}: {
    userId: string;
    limit?: number;
    page?: number;
}) => {
    try {
        const skip = (page - 1) * limit;

        const transactions = await prisma.transaction.findMany({
            where: { userId },
            orderBy: {
                date: 'desc',
            },
            skip,
            take: limit,
            include: {
                bank: true,
            },
        });

        const total = await prisma.transaction.count({
            where: { userId },
        });

        return parseStringify({
            data: transactions,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error('Error getting transactions:', error);
        return {
            data: [],
            total: 0,
            page: 1,
            totalPages: 1,
        };
    }
};

export const syncTransactions = async ({ bankId }: { bankId: string }) => {
    try {
        const bank = await prisma.bank.findUnique({
            where: { id: bankId },
        });

        if (!bank) {
            throw new Error('Bank not found');
        }

        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        const response = await plaidClient.transactionsGet({
            access_token: bank.accessToken,
            start_date: thirtyDaysAgo.toISOString().split('T')[0],
            end_date: now.toISOString().split('T')[0],
            options: {
                count: 500,
                offset: 0,
            },
        });

        const plaidTransactions = response.data.transactions;

        for (const transaction of plaidTransactions) {
            await prisma.transaction.upsert({
                where: { transactionId: transaction.transaction_id },
                update: {
                    name: transaction.name,
                    amount: transaction.amount,
                    date: new Date(transaction.date),
                    pending: transaction.pending,
                    category: transaction.category || [],
                    channel: transaction.payment_channel,
                    paymentMeta: transaction.payment_meta as any,
                    merchantName: transaction.merchant_name,
                    location: transaction.location as any,
                },
                create: {
                    bankId: bank.id,
                    userId: bank.userId,
                    transactionId: transaction.transaction_id,
                    name: transaction.name,
                    amount: transaction.amount,
                    date: new Date(transaction.date),
                    pending: transaction.pending,
                    category: transaction.category || [],
                    channel: transaction.payment_channel,
                    paymentMeta: transaction.payment_meta as any,
                    merchantName: transaction.merchant_name,
                    location: transaction.location as any,
                },
            });
        }

        const accountsResponse = await plaidClient.accountsBalanceGet({
            access_token: bank.accessToken,
        });

        const accountData = accountsResponse.data.accounts.find(
            (acc: any) => acc.account_id === bank.accountId
        );

        if (accountData) {
            await prisma.bank.update({
                where: { id: bankId },
                data: {
                    currentBalance: accountData.balances.current || 0,
                    availableBalance: accountData.balances.available || accountData.balances.current || 0,
                },
            });
        }

        revalidatePath('/transaction-history');
        revalidatePath('/');

        return parseStringify({ success: true, count: plaidTransactions.length });
    } catch (error) {
        console.error('Error syncing transactions:', error);
        throw error;
    }
};
