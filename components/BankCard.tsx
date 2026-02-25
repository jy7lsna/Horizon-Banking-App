import { formatAmount } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import Copy from './Copy';

const BankCard = ({
    account,
    userName,
    showBalance = true,
}: CreditCardProps) => {
    return (
        <div className="flex flex-col">
            <Link
                href={`/transaction-history/?id=${account.shareableId}`}
                className="bank-card"
            >
                <div className="bank-card_content">
                    <div>
                        <h1 className="text-16 font-semibold text-white">{account.name}</h1>
                        <p className="font-ibm-plex-serif font-black text-white">
                            {formatAmount(account.currentBalance)}
                        </p>
                    </div>

                    <article className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <h1 className="text-12 font-semibold text-white">{userName}</h1>
                            <h2 className="text-12 font-semibold text-white">●● / ●●</h2>
                        </div>
                        <p className="text-14 font-semibold tracking-[1.1px] text-white">
                            ●●●● ●●●● ●●●● <span className="text-16">{account.mask}</span>
                        </p>
                    </article>
                </div>

                <div className="bank-card_icon">
                    <div className="w-5 h-6 bg-white/30 rounded" />
                    <div className="ml-5 w-[45px] h-[32px] flex items-center">
                        <div className="flex">
                            <div className="w-6 h-6 rounded-full bg-red-500 opacity-80" />
                            <div className="w-6 h-6 rounded-full bg-yellow-400 opacity-80 -ml-3" />
                        </div>
                    </div>
                </div>
            </Link>

            {showBalance && <Copy title={account.shareableId} />}
        </div>
    );
};

export default BankCard;
