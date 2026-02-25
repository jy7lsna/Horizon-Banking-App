import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

const Footer = ({ user, type = "desktop" }: FooterProps) => {
    const router = useRouter();

    const handleLogOut = async () => {
        // In production, call signOut from next-auth
        router.push("/sign-in");
    };

    return (
        <footer className="footer">
            <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
                <p className="text-xl font-bold text-gray-700">
                    {user?.firstName?.[0]}
                </p>
            </div>

            <div className={type === "mobile" ? "footer_email-mobile" : "footer_email"}>
                <h1 className="text-14 truncate text-gray-700 font-semibold">
                    {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-14 truncate font-normal text-gray-600">
                    {user?.email}
                </p>
            </div>

            <div className="footer_image" onClick={handleLogOut}>
                <LogOut className="w-6 h-6 text-gray-500 cursor-pointer" />
            </div>
        </footer>
    );
};

export default Footer;
