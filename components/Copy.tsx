'use client';

import { useState } from 'react';
import { Check, Copy as CopyIcon } from 'lucide-react';

const Copy = ({ title }: { title: string }) => {
    const [hasCopied, setHasCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(title);
        setHasCopied(true);

        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    };

    return (
        <div className="mt-3 flex max-w-[320px] gap-4">
            <p className="text-14 truncate font-medium text-gray-600 line-clamp-1 w-full">
                {title}
            </p>
            <div className="cursor-pointer" onClick={copyToClipboard}>
                {hasCopied ? (
                    <Check className="w-4 h-4 text-success-600" />
                ) : (
                    <CopyIcon className="w-4 h-4 text-gray-500" />
                )}
            </div>
        </div>
    );
};

export default Copy;
