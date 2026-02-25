import HeaderBox from '@/components/HeaderBox';
import { Pagination } from '@/components/Pagination';
import TransactionsTable from '@/components/TransactionsTable';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getTransactions } from '@/lib/actions/transaction.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';

const TransactionHistory = async ({
    searchParams: { id, page },
}: SearchParamProps) => {
    const currentPage = Number(page as string) || 1;
    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({ userId: loggedIn?.id || '' });

    if (!accounts) return null;

    const accountsData = accounts?.data;

    const transactions = await getTransactions({
        userId: loggedIn?.id || '',
        limit: 10,
        page: currentPage,
    });

    const rowsPerPage = 10;
    const totalPages = Math.ceil(transactions.total / rowsPerPage);

    return (
        <div className="transactions">
            <div className="transactions-header">
                <HeaderBox
                    title="Transaction History"
                    subtext="See your bank details and transactions."
                />
            </div>

            <div className="space-y-6">
                <div className="transactions-account">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-18 font-bold text-white">
                            {accountsData?.[0]?.name || 'No Account'}
                        </h2>
                        <p className="text-14 text-blue-25">
                            {accountsData?.[0]?.officialName || ''}
                        </p>
                        <p className="text-14 font-semibold tracking-[1.1px] text-white">
                            ●●●● ●●●● ●●●● {accountsData?.[0]?.mask || '0000'}
                        </p>
                    </div>

                    <div className="transactions-account-balance">
                        <p className="text-14">Current balance</p>
                        <p className="text-24 text-center font-bold">
                            {formatAmount(accountsData?.[0]?.currentBalance || 0)}
                        </p>
                    </div>
                </div>

                <section className="flex w-full flex-col gap-6">
                    <TransactionsTable transactions={transactions.data} />
                    {totalPages > 1 && (
                        <div className="my-4 w-full">
                            <Pagination totalPages={totalPages} page={currentPage} />
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default TransactionHistory;
