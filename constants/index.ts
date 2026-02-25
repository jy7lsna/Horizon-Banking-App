export const sidebarLinks = [
    {
        imgURL: '/icons/home.svg',
        route: '/',
        label: 'Home',
    },
    {
        imgURL: '/icons/dollar-circle.svg',
        route: '/my-banks',
        label: 'My Banks',
    },
    {
        imgURL: '/icons/transaction.svg',
        route: '/transaction-history',
        label: 'Transaction History',
    },
    {
        imgURL: '/icons/money-send.svg',
        route: '/transfer-funds',
        label: 'Transfer Funds',
    },
    {
        imgURL: '/icons/connect-bank.svg',
        route: '/connect-bank',
        label: 'Connect Bank',
    },
];

export const topCategoryStyles: Record<string, { bg: string; circleBg: string; text: { main: string; count: string }; progress: { bg: string; indicator: string }; icon: string }> = {
    'Food and Drink': {
        bg: 'bg-blue-25',
        circleBg: 'bg-blue-100',
        text: {
            main: 'text-blue-900',
            count: 'text-blue-700',
        },
        progress: {
            bg: 'bg-blue-100',
            indicator: 'bg-blue-700',
        },
        icon: '/icons/monitor.svg',
    },
    Travel: {
        bg: 'bg-success-25',
        circleBg: 'bg-success-100',
        text: {
            main: 'text-success-900',
            count: 'text-success-700',
        },
        progress: {
            bg: 'bg-success-100',
            indicator: 'bg-success-700',
        },
        icon: '/icons/coins.svg',
    },
    Transfer: {
        bg: 'bg-pink-25',
        circleBg: 'bg-pink-100',
        text: {
            main: 'text-pink-900',
            count: 'text-pink-700',
        },
        progress: {
            bg: 'bg-pink-100',
            indicator: 'bg-pink-700',
        },
        icon: '/icons/shopping-bag.svg',
    },
    default: {
        bg: 'bg-blue-25',
        circleBg: 'bg-blue-100',
        text: {
            main: 'text-blue-900',
            count: 'text-blue-700',
        },
        progress: {
            bg: 'bg-blue-100',
            indicator: 'bg-blue-700',
        },
        icon: '/icons/monitor.svg',
    },
};

export const transactionCategoryStyles: Record<string, { borderColor: string; backgroundColor: string; textColor: string; chipBackgroundColor: string }> = {
    'Food and Drink': {
        borderColor: 'border-success-600',
        backgroundColor: 'bg-success-25',
        textColor: 'text-success-700',
        chipBackgroundColor: 'bg-inherit',
    },
    Travel: {
        borderColor: 'border-[#F04438]',
        backgroundColor: 'bg-pink-25',
        textColor: 'text-[#B42318]',
        chipBackgroundColor: 'bg-[#F04438]',
    },
    Transfer: {
        borderColor: 'border-blue-600',
        backgroundColor: 'bg-blue-25',
        textColor: 'text-blue-700',
        chipBackgroundColor: 'bg-blue-600',
    },
    default: {
        borderColor: '',
        backgroundColor: 'bg-blue-25',
        textColor: 'text-blue-700',
        chipBackgroundColor: 'bg-gray-500',
    },
};
