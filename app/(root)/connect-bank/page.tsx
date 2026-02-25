import HeaderBox from '@/components/HeaderBox';
import PlaidLink from '@/components/PlaidLink';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const ConnectBank = async () => {
    const loggedIn = await getLoggedInUser();

    return (
        <section className="payment-transfer">
            <HeaderBox
                title="Connect Your Bank"
                subtext="Connect your bank account to get started with Horizon."
            />

            <div className="flex flex-col gap-4 pt-5">
                <PlaidLink
                    user={loggedIn || { id: '', email: '', firstName: '', lastName: '' }}
                    variant="primary"
                />
            </div>
        </section>
    );
};

export default ConnectBank;
