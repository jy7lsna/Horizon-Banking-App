'use server';

import { plaidClient } from '../plaid';
import { parseStringify, encryptId } from '../utils';
import { prisma } from '@/lib/db';
import { CountryCode, Products } from 'plaid';
import { revalidatePath } from 'next/cache';
import { addFundingSource, createDwollaCustomer } from './dwolla.actions';

export const createLinkToken = async (user: User) => {
    try {
        const tokenParams = {
            user: {
                client_user_id: user.id,
            },
            client_name: `${user.firstName} ${user.lastName}`,
            products: ['auth', 'transactions'] as Products[],
            country_codes: ['US'] as CountryCode[],
            language: 'en',
        };

        const response = await plaidClient.linkTokenCreate(tokenParams);

        return parseStringify({ linkToken: response.data.link_token });
    } catch (error) {
        console.error('Error creating link token:', error);
        throw error;
    }
};

export const exchangePublicToken = async ({
    publicToken,
    user,
}: {
    publicToken: string;
    user: User;
}) => {
    try {
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken,
        });

        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;

        const accountsResponse = await plaidClient.accountsGet({
            access_token: accessToken,
        });

        const accountData = accountsResponse.data.accounts[0];

        const request = {
            access_token: accessToken,
            account_id: accountData.account_id,
            processor: "dwolla" as const,
        };

        const processorTokenResponse = await plaidClient.processorTokenCreate(request);
        const processorToken = processorTokenResponse.data.processor_token;

        let dwollaCustomerId = user.dwollaCustomerId;

        if (!dwollaCustomerId) {
            const dwollaCustomerUrl = await createDwollaCustomer({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                type: 'personal',
                address1: user.address || '',
                city: user.city || '',
                state: user.state || '',
                postalCode: user.postalCode || '',
                dateOfBirth: user.dateOfBirth?.toISOString().split('T')[0] || '',
                ssn: user.ssn || '',
            });

            dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

            await prisma.user.update({
                where: { id: user.id },
                data: {
                    dwollaCustomerId,
                    dwollaCustomerUrl,
                },
            });
        }

        const fundingSourceUrl = await addFundingSource({
            dwollaCustomerId,
            processorToken,
            bankName: accountData.name,
        });

        const bank = await prisma.bank.create({
            data: {
                userId: user.id,
                accountId: accountData.account_id,
                accessToken,
                itemId,
                institutionId: accountData.institution_id || '',
                name: accountData.name,
                officialName: accountData.official_name || accountData.name,
                type: accountData.type,
                subtype: accountData.subtype || '',
                mask: accountData.mask || '',
                currentBalance: accountData.balances.current || 0,
                availableBalance: accountData.balances.available || accountData.balances.current || 0,
                isoCurrencyCode: accountData.balances.iso_currency_code || 'USD',
            },
        });

        revalidatePath('/');

        return parseStringify({
            publicTokenExchange: 'complete',
            bank,
        });
    } catch (error) {
        console.error('Error exchanging public token:', error);
        throw error;
    }
};

export const getAccounts = async ({ userId }: { userId: string }) => {
    try {
        const banks = await prisma.bank.findMany({
            where: { userId },
            include: {
                transactions: {
                    orderBy: {
                        date: 'desc',
                    },
                    take: 5,
                },
            },
        });

        const accounts = banks.map(bank => ({
            id: bank.id,
            availableBalance: bank.availableBalance || 0,
            currentBalance: bank.currentBalance,
            officialName: bank.officialName || bank.name,
            mask: bank.mask || '',
            institutionId: bank.institutionId,
            name: bank.name,
            type: bank.type,
            subtype: bank.subtype || '',
            shareableId: encryptId(bank.id),
        }));

        const totalBanks = accounts.length;
        const totalCurrentBalance = accounts.reduce(
            (total, account) => total + account.currentBalance,
            0
        );

        return parseStringify({
            data: accounts,
            totalBanks,
            totalCurrentBalance,
        });
    } catch (error) {
        console.error('Error getting accounts:', error);
        return null;
    }
};

export const getBank = async ({ documentId }: { documentId: string }) => {
    try {
        const bank = await prisma.bank.findUnique({
            where: { id: documentId },
        });

        return parseStringify(bank);
    } catch (error) {
        console.error('Error getting bank:', error);
        return null;
    }
};

export const getBankByAccountId = async ({ accountId }: { accountId: string }) => {
    try {
        const bank = await prisma.bank.findUnique({
            where: { accountId },
        });

        return parseStringify(bank);
    } catch (error) {
        console.error('Error getting bank by account ID:', error);
        return null;
    }
};

function extractCustomerIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
}
