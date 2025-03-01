"use client";

import { Gobus } from "@/app/context";
import { Button } from "@/components/ui/button";
import { Bus, ChevronDown, HelpCircle, Info, Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
    const { loggedin } = Gobus();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // Logout function

    return (
        <header className="w-full bg-white shadow-md sticky top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-black">
                    <Bus size={28} /> GoBus
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    {loggedin ? (
                        <>
                            <Link href="/services" className="hover:text-blue-600">Services</Link>
                            <Link href="/services/trackbooking" className="hover:text-blue-600">Track Bus</Link>

                            {/* More Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setIsMoreDropdownOpen(!isMoreDropdownOpen);
                                        setIsProfileDropdownOpen(false); // Ensure Profile Dropdown stays closed
                                    }}
                                    className="flex items-center gap-1 hover:text-blue-600 focus:outline-none"
                                >
                                    More <ChevronDown size={16} />
                                </button>

                                {isMoreDropdownOpen && (
                                    <div className="absolute left-0 mt-6 w-48 bg-black text-white shadow-lg rounded-md py-2">
                                        <Link href="/profile/aboutus" className="flex items-center px-4 py-2 gap-2 hover:bg-gray-800">
                                            <Info size={16} /> About Us
                                        </Link>
                                        <Link href="/profile/contacts" className="flex items-center px-4 py-2 gap-2 hover:bg-gray-800">
                                            <Mail size={16} /> Contact
                                        </Link>
                                        <Link href="/faq" className="flex items-center px-4 py-2 gap-2 hover:bg-gray-800">
                                            <HelpCircle size={16} /> FAQs
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <span className="text-gray-600">Not Logged In</span>
                    )}
                </nav>


                {/* Authentication */}
                <div className="hidden md:flex gap-2">
                    {loggedin ? (
                        <div className="relative">
                            <button
                                className="hover:text-blue-600 focus:outline-none"
                                onClick={() => {
                                    setIsProfileDropdownOpen(!isProfileDropdownOpen);
                                    setIsMoreDropdownOpen(false);
                                }}
                            >
                                Profile
                            </button>
                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-black text-white shadow-lg rounded-md py-2">
                                    <Link href="/profile/account" className="block px-4 py-2 hover:bg-gray-800">Account</Link>
                                    <Link href="/my-bookings" className="block px-4 py-2 hover:bg-gray-800">My Bookings</Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Button asChild>
                                <Link href="/verification/signin">Login</Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/verification/signup">Sign Up</Link>
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-black-600"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <Menu size={28} />
                </button>
            </div>

            {/* Sidebar for Mobile */}
            <div
                className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                onClick={() => setIsSidebarOpen(false)}
            >
                <div className="w-64 bg-white h-full shadow-md flex flex-col p-5" onClick={(e) => e.stopPropagation()}>
                    {/* Close Button */}
                    <button className="self-end mb-4" onClick={() => setIsSidebarOpen(false)}>
                        <X size={24} />
                    </button>
                    {loggedin ? (
                        <>
                            <Link href="/services" className="p-3 hover:bg-gray-100 rounded">Services</Link>
                            <Link href="/services/trackbooking" className="p-3 hover:bg-gray-100 rounded">Track Bus</Link>

                            {/* More Dropdown in Sidebar */}
                            <details className="p-3">
                                <summary className="cursor-pointer">More</summary>
                                <div className="ml-4 flex flex-col">
                                    <Link href="/profile/aboutus" className="p-2 hover:bg-gray-100 rounded">About Us</Link>
                                    <Link href="/profile/contacts" className="p-2 hover:bg-gray-100 rounded">Contact</Link>
                                    <Link href="/faq" className="p-2 hover:bg-gray-100 rounded">FAQs</Link>
                                </div>
                            </details>

                            {/* Authentication in Sidebar */}
                            <div className="mt-auto flex flex-col">
                                <Link href="/profile/account" className="p-3 hover:bg-gray-100 rounded">Account</Link>
                                <Link href="/my-bookings" className="p-3 hover:bg-gray-100 rounded">My Bookings</Link>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center mt-4 text-gray-600">
                            <span className="text-lg">Not Logged In</span>

                            {/* Login and Signup */}
                            <Button asChild className="w-full mt-3">
                                <Link href="/verification/signin">Login</Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full mt-2">
                                <Link href="/verification/signup">Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </div>

            </div>
        </header>
    );
};

export default Navbar;
