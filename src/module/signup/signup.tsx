
import React, {useState} from "react";
import {User} from "firebase/auth";
import {useRouter} from "next/navigation";
import {auth} from "@/lib/firebase/firebase";
import {createUserWithEmailAndPassword} from "@firebase/auth";

export const SignupPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    console.log("error", error);
    console.log("user", user);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log("Email:", email);
            console.log("Password:", password);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User Credential:", userCredential);

            setUser(userCredential.user ?? null);

            setError("");
            router.push("http://192.168.1.163:3001/");
        } catch (error) {// Fixed TypeScript error by using `any`
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    const handleLoginRedirect = () => {
        router.push('/log-in');
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen w-full"
            style={{
                backgroundImage: "url('/Image.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="p-8 rounded-lg shadow-md w-96 bg-white border-black">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}

                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}

                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-xl text-white p-2 rounded hover:bg-blue-200 hover:text-black"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="text-center mt-4 flex justify-center items-center space-x-1 text-sm">
                    <p>Already have an account?</p>
                    <button onClick={handleLoginRedirect} className="text-blue-500">Log In</button>
                </div>
            </div>
        </div>
    );
};
