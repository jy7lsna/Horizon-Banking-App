import { Client } from 'dwolla-v2';

const getEnvironment = (): "production" | "sandbox" => {
    const environment = process.env.DWOLLA_ENV;
    return (environment === "production" || environment === "sandbox")
        ? environment
        : "sandbox";
};

export const dwollaClient = new Client({
    environment: getEnvironment(),
    key: process.env.DWOLLA_KEY!,
    secret: process.env.DWOLLA_SECRET!,
});
