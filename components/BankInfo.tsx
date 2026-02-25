import { formatAmount, getAccountTypeColors } from '@/lib/utils';

const BankInfo = ({ account, type }: BankInfoProps) => {
    const colors = getAccountTypeColors(account.type as AccountTypes);

    return (
        <div className={`bank-info ${colors.bg}`}>
            <figure className={`flex-center h-fit rounded-full ${colors.lightBg}`}>
                <div className="w-6 h-6 flex items-center justify-center">
                    <div className={`w-3 h-3 rounded-full ${colors.lightBg}`} />
                </div>
            </figure>

            <div className="flex w-full flex-1 flex-col justify-center gap-1">
                <div className="bank-info_content">
                    <h2 className={`text-16 line-clamp-1 flex-1 font-bold ${colors.title}`}>
                        {account.name}
                    </h2>
                    {type === 'full' && (
                        <p className={`text-12 rounded-full px-3 py-1 font-medium ${colors.subText}`}>
                            {account.subtype}
                        </p>
                    )}
                </div>

                <p className={`text-16 font-medium ${colors.title}`}>
                    {formatAmount(account.currentBalance)}
                </p>
            </div>
        </div>
    );
};

export default BankInfo;
