"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            toast.error("Please fill all the fields...", {
                position: "top-right",
                theme: "dark",
            });
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auuth/signin", {  // ✅ Fixed endpoint typo
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials:"include",
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Signup Successful! Redirecting...", {
                    position: "top-right",
                    theme: "dark",
                });

                setTimeout(() => {
                    router.push("/verification/login");
                }, 3000);
            } else {
                toast.error(data.error || "Signup failed.", {
                    position: "top-right",
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error("Signup error:", error);
            toast.error("Something went wrong. Please try again.", {
                position: "top-right",
                theme: "dark",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <ToastContainer autoClose={3000} />

            <div className="bg-white shadow-md rounded-lg p-6 w-[350px]">
                <h1 className="text-2xl font-semibold text-center mb-4">Sign Up</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name" className="text-sm">Full Name</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="email" className="text-sm">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="password" className="text-sm">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-black text-white hover:bg-gray-800"
                        disabled={loading}
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </Button>
                </form>

                <p className="text-center text-gray-500 text-xs mt-3">
                    Already have an account?{" "}
                    <Link href="/verification/login" className="text-blue-600 hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
