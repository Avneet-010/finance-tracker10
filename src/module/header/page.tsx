import {Dancing_Script} from "next/font/google";
import {auth, logout} from '@/lib/firebase/firebase';
import {useRouter} from "next/navigation";


const dancingScript = Dancing_Script({ subsets: ["latin"] });

export default function CreateHeader() {

    const router = useRouter()
    const user = auth.currentUser;
    const userName = user?.email?.split("@")[0] || "Guest";

    const handleSignOut = async () => {
        console.log("sign out is called")
        try {

            await logout();
            router.replace('/sign-up')
            console.log("User signed out successfully");
        } catch (error) {
            console.error("Error signing out:", error);

        }
    };

    return (
        <header className="flex justify-between">
            <div className="flex items-center gap-3">
                <img src="/user-solid.svg" alt="Profile Image" width={20} height={20} />
                <h3 className="font-extrabold text-2xl text-black">Hey, I am {userName}</h3>
            </div>
            <h1 className={`${dancingScript.className} text-6xl font-bold`}>Trackify</h1>
            <nav className="flex sm:gap-5 gap-2 items-center">
                <img src="/square-poll-vertical-solid.svg" alt="Stats" className="w-10 h-10 sm:hidden" />
                <button
                    onClick={handleSignOut}
                    className="w-52 px-4 py-2 font-extrabold border text-sm capitalize rounded-xl bg-black text-amber-50 border-black border-b-4 hover:bg-transparent hover:text-black  transform hover:scale-110 hover:shadow-xl transition-all duration-500 ease-in-out"
                >
                    Sign Out
                </button>
            </nav>
        </header>
    );
}
