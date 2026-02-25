'use server';

import { dwollaClient } from '../dwolla';

export const createDwollaCustomer = async (newCustomer: {
    firstName: string;
    lastName: string;
    email: string;
    type: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string;
    ssn: string;
}) => {
    try {
        const response = await dwollaClient.post('customers', newCustomer);
        return response.headers.get('location') as string;
    } catch (error) {
        console.error('Creating Dwolla Customer Failed:', error);
        throw error;
    }
};

export const createFundingSource = async (options: {
    customerId: string;
    fundingSourceName: string;
    plaidToken: string;
    _links: object;
}) => {
    try {
        return await dwollaClient.post(
            `customers/${options.customerId}/funding-sources`,
            {
                name: options.fundingSourceName,
                plaidToken: options.plaidToken,
            }
        );
    } catch (error) {
        console.error('Creating Funding Source Failed:', error);
        throw error;
    }
};

export const createTransfer = async ({
    sourceFundingSourceUrl,
    destinationFundingSourceUrl,
    amount,
}: TransferParams) => {
    try {
        const requestBody = {
            _links: {
                source: {
                    href: sourceFundingSourceUrl,
                },
                destination: {
                    href: destinationFundingSourceUrl,
                },
            },
            amount: {
                currency: 'USD',
                value: amount,
            },
        };

        return await dwollaClient.post('transfers', requestBody);
    } catch (error) {
        console.error('Transfer fund failed:', error);
        throw error;
    }
};

export const addFundingSource = async ({
    dwollaCustomerId,
    processorToken,
    bankName,
}: AddFundingSourceParams) => {
    try {
        const dwollaAuthLinks = await dwollaClient.get('/');

        const fundingSourceOptions = {
            customerId: dwollaCustomerId,
            fundingSourceName: bankName,
            plaidToken: processorToken,
            _links: dwollaAuthLinks._links,
        };

        const response = await createFundingSource(fundingSourceOptions);
        return response.headers.get('location') as string;
    } catch (error) {
        console.error('Adding funding source failed:', error);
        throw error;
    }
};
