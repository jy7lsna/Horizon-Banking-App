/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

declare type SignUpParams = {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string;
    ssn: string;
    email: string;
    password: string;
};

declare type LoginUser = {
    email: string;
    password: string;
};

declare type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    dateOfBirth?: Date;
    ssn?: string;
    dwollaCustomerId?: string;
    dwollaCustomerUrl?: string;
};

declare type NewUserParams = {
    userId: string;
    email: string;
    name: string;
    password: string;
};

declare type Account = {
    id: string;
    availableBalance: number;
    currentBalance: number;
    officialName: string;
    mask: string;
    institutionId: string;
    name: string;
    type: string;
    subtype: string;
    shareableId: string;
};

declare type Transaction = {
    id: string;
    transactionId: string;
    name: string;
    paymentChannel: string;
    type: string;
    accountId: string;
    amount: number;
    pending: boolean;
    category: string[];
    date: Date;
    image: string;
    channel: string;
    senderBankId: string;
    receiverBankId: string;
};

declare type Bank = {
    id: string;
    accountId: string;
    accessToken: string;
    itemId: string;
    shareableId: string;
    institutionId: string;
    name: string;
    officialName: string;
    currentBalance: number;
    availableBalance: number;
    mask: string;
    type: string;
    subtype: string;
};

declare type AccountTypes =
    | "depository"
    | "credit"
    | "loan"
    | "investment"
    | "other";

declare type Category = "Food and Drink" | "Travel" | "Transfer";

declare type CategoryCount = {
    name: string;
    count: number;
    totalCount: number;
};

declare type Receiver = {
    firstName: string;
    lastName: string;
};

declare type TransferParams = {
    sourceFundingSourceUrl: string;
    destinationFundingSourceUrl: string;
    amount: string;
};

declare type AddFundingSourceParams = {
    dwollaCustomerId: string;
    processorToken: string;
    bankName: string;
};

declare interface CreditCardProps {
    account: Account;
    userName: string;
    showBalance?: boolean;
}

declare interface BankInfoProps {
    account: Account;
    type: "full" | "card";
}

declare interface HeaderBoxProps {
    type?: "title" | "greeting";
    title: string;
    subtext: string;
    user?: string;
}

declare interface MobileNavProps {
    user: User;
}

declare interface PageHeaderProps {
    topTitle: string;
    bottomTitle: string;
    topDescription: string;
    bottomDescription: string;
    connectBank?: boolean;
}

declare interface PaginationProps {
    page: number;
    totalPages: number;
}

declare interface PlaidLinkProps {
    user: User;
    variant?: "primary" | "ghost";
    dwollaCustomerId?: string;
}

declare interface AuthFormProps {
    type: "sign-in" | "sign-up";
}

declare interface BankDropdownProps {
    accounts: Account[];
    setValue?: UseFormSetValue<any>;
    otherStyles?: string;
}

declare interface BankTabItemProps {
    account: Account;
    appwriteItemId?: string;
}

declare interface TotlaBalanceBoxProps {
    accounts: Account[];
    totalBanks: number;
    totalCurrentBalance: number;
}

declare interface FooterProps {
    user: User;
    type?: "mobile" | "desktop";
}

declare interface RightSidebarProps {
    user: User;
    transactions: Transaction[];
    banks: Bank[] & Account[];
}

declare interface SiderbarProps {
    user: User;
}

declare interface RecentTransactionsProps {
    accounts: Account[];
    transactions: Transaction[];
    userId: string;
    page: number;
}

declare interface TransactionHistoryTableProps {
    transactions: Transaction[];
    page: number;
}

declare interface CategoryBadgeProps {
    category: string;
}

declare interface TransactionTableProps {
    transactions: Transaction[];
}

declare interface CategoryProps {
    category: CategoryCount;
}

declare interface DoughnutChartProps {
    accounts: Account[];
}

declare interface PaymentTransferFormProps {
    accounts: Account[];
}

declare type AccountBalance = {
    available: number | null;
    current: number;
    iso_currency_code: string;
    limit: number | null;
    unofficial_currency_code: string | null;
};
