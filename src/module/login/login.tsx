import React, {useState} from "react";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {auth} from "@/lib/firebase/firebase";
import {useRouter} from "next/navigation"; // import useRouter

export const LoginPage = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(""); // You might want to display this error message
    const router = useRouter(); // Initialize router

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setError("");
            localStorage.setItem('loggedIn',' true');
            router.push("/");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };
    const handleSignupRedirect = () => {
        router.push('/sign-up');
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
                <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

                {/* Display error message if exists */}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            className="w-full p-2 border rounded border-black"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            className="w-full p-2 border rounded border-black"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-xl text-white p-2 rounded hover:bg-blue-200 hover:text-black"
                    >
                        Log In
                    </button>
                </form>

                <div className="text-center mt-4 flex justify-center gap-3 items-center space-x-1 text-sm">
                    <p>New User?    </p>
                    <button onClick={handleSignupRedirect} className="text-blue-500">Sign Up</button>
                </div>

        </div>
        </div>
    );
};
