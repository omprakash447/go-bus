"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in both fields.", { theme: "dark" });
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auuth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Login successful! Redirecting...", { theme: "dark" });
                localStorage.setItem("user", JSON.stringify({ email, password }));

                setTimeout(() => {
                    router.push("/"); // ✅ Redirect to home
                    setTimeout(() => {
                        window.location.reload(); // ✅ Refresh after redirect
                    }, 1000);
                }, 3000); // 3-second delay before redirection
            } else {
                toast.error(data.error || "Login failed.", { theme: "dark" });
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Something went wrong. Please try again.", { theme: "dark" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer autoClose={3000} />

            <div className="bg-white shadow-md rounded-lg p-8 w-96">
                <h1 className="text-2xl font-bold text-center mb-6">Sign in to Go-Bus</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="mt-1 w-full"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="mt-1 w-full"
                        />
                    </div>

                    {/* Submit Button */}
                    <Button 
                        type="submit" 
                        className="w-full bg-black text-white hover:bg-gray-800"
                        disabled={loading}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </Button>
                </form>

                {/* Signup Link */}
                <p className="text-center text-gray-500 text-sm mt-4">
                    Don't have an account? <Link href="/verification/signup" className="text-blue-600 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
