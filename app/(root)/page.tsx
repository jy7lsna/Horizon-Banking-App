import HeaderBox from '@/components/HeaderBox';
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

export default async function Home() {
    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({ userId: loggedIn?.id || '' });

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome,"
                        user={loggedIn?.firstName || 'Guest'}
                        subtext="Access and manage your account and transactions efficiently."
                    />

                    <TotalBalanceBox
                        accounts={accounts?.data || []}
                        totalBanks={accounts?.totalBanks || 0}
                        totalCurrentBalance={accounts?.totalCurrentBalance || 0}
                    />
                </header>

                <RecentTransactions
                    accounts={accounts?.data || []}
                    transactions={[]}
                    userId={loggedIn?.id || ''}
                    page={1}
                />
            </div>

            <RightSidebar
                user={loggedIn || { id: '', email: '', firstName: 'Guest', lastName: '' }}
                transactions={[]}
                banks={accounts?.data?.slice(0, 2) || []}
            />
        </section>
    );
}
