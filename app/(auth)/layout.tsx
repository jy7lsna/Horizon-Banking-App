import Image from "next/image";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex min-h-screen w-full justify-between font-inter">
            {children}
            <div className="auth-asset">
                <div className="flex flex-col items-center justify-center gap-4 p-12">
                    <div className="flex items-center gap-2">
                        <Image src="/icons/logo.svg" width={34} height={34} alt="Horizon logo" />
                        <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                            Horizon
                        </h1>
                    </div>
                    <p className="text-16 font-normal text-gray-600 text-center max-w-[300px]">
                        Manage your finances with ease. Connect your bank accounts and track your transactions in real-time.
                    </p>
                </div>
            </div>
        </main>
    );
}
