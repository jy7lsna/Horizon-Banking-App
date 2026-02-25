import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import BankTabItem from './BankTabItem';
import BankInfo from './BankInfo';
import TransactionsTable from './TransactionsTable';

const RecentTransactions = ({
    accounts,
    transactions = [],
    userId,
    page = 1,
}: RecentTransactionsProps) => {
    return (
        <section className="recent-transactions">
            <header className="flex items-center justify-between">
                <h2 className="recent-transactions-label">Recent transactions</h2>
                <Link
                    href={`/transaction-history/?id=${accounts[0]?.shareableId}`}
                    className="view-all-btn"
                >
                    View all
                </Link>
            </header>

            <Tabs defaultValue={accounts[0]?.shareableId} className="w-full">
                <TabsList className="recent-transactions-tablist">
                    {accounts.map((account: Account) => (
                        <TabsTrigger key={account.id} value={account.shareableId}>
                            <BankTabItem
                                key={account.id}
                                account={account}
                            />
                        </TabsTrigger>
                    ))}
                </TabsList>

                {accounts.map((account: Account) => (
                    <TabsContent
                        value={account.shareableId}
                        key={account.id}
                        className="space-y-4"
                    >
                        <BankInfo
                            account={account}
                            type="full"
                        />

                        <TransactionsTable transactions={transactions} />
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    );
};

export default RecentTransactions;
