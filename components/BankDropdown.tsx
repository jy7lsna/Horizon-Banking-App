'use client';

import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { formatAmount } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery } from '@/lib/utils';

const BankDropdown = ({ accounts = [], setValue, otherStyles }: BankDropdownProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [selected, setSelected] = useState(accounts[0]);

    const handleBankChange = (id: string) => {
        const account = accounts.find((account) => account.shareableId === id)!;
        setSelected(account);
        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'id',
            value: id,
        });
        router.push(newUrl, { scroll: false });

        if (setValue) {
            setValue('senderBank', id);
        }
    };

    return (
        <Select
            defaultValue={selected?.shareableId}
            onValueChange={(value) => handleBankChange(value)}
        >
            <SelectTrigger
                className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}
            >
                <SelectValue placeholder="Select a bank" />
            </SelectTrigger>
            <SelectContent
                className={`w-full bg-white md:w-[300px] ${otherStyles}`}
                align="end"
            >
                <SelectGroup>
                    {accounts.map((account: Account) => (
                        <SelectItem
                            key={account.id}
                            value={account.shareableId}
                            className="cursor-pointer border-t"
                        >
                            <div className="flex flex-col">
                                <p className="text-16 font-medium">{account.name}</p>
                                <p className="text-14 font-medium text-blue-600">
                                    {formatAmount(account.currentBalance)}
                                </p>
                            </div>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default BankDropdown;
