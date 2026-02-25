'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/bank.actions';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const router = useRouter();
    const [token, setToken] = useState('');

    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);
            setToken(data?.linkToken);
        };

        getLinkToken();
    }, [user]);

    const onSuccess = useCallback<PlaidLinkOnSuccess>(
        async (public_token: string) => {
            await exchangePublicToken({
                publicToken: public_token,
                user,
            });

            router.push('/');
        },
        [user, router]
    );

    const config: PlaidLinkOptions = {
        token,
        onSuccess,
    };

    const { open, ready } = usePlaidLink(config);

    return (
        <>
            {variant === 'primary' ? (
                <Button
                    onClick={() => open()}
                    disabled={!ready}
                    className="plaid-link-primary"
                >
                    Connect bank
                </Button>
            ) : variant === 'ghost' ? (
                <Button
                    onClick={() => open()}
                    variant="ghost"
                    className="plaid-link-ghost"
                >
                    Connect bank
                </Button>
            ) : (
                <Button onClick={() => open()} className="plaid-link-default">
                    Connect bank
                </Button>
            )}
        </>
    );
};

export default PlaidLink;
