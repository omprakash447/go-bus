"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Edit, LogOut, Mail, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Account() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false); // Modal state
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/auuth/getlogin", { credentials: "include" });
        const data = await res.json();
        if (data.status === 200) {
          setUser(data.message);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/verification/signin");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex justify-center items-center p-6">
      <Card className="bg-black/80 backdrop-blur-lg text-white shadow-xl rounded-2xl w-full max-w-md border border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">👤 Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-3">
            <img
              src="https://cdn.dribbble.com/users/5534/screenshots/14230133/profile_4x.jpg" // Default avatar if no profile picture
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-gray-500"
            />
            <p className="text-gray-300 text-sm italic">Welcome, {user.name}!</p>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-md">
            <User className="text-gray-400 w-5 h-5" />
            <p className="text-gray-300">
              <span className="font-semibold text-white">Name:</span> {user.name}
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-md">
            <Mail className="text-gray-400 w-5 h-5" />
            <p className="text-gray-300">
              <span className="font-semibold text-white">Email:</span> {user.email}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-3">
            <Button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push("/profile/edit")}
            >
              <Edit className="w-5 h-5" /> Edit Profile
            </Button>

            <Button
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800"
              onClick={() => router.push("/my-bookings")}
            >
              <Calendar className="w-5 h-5" /> My Bookings
            </Button>

            <Button
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800"
              onClick={() => setOpen(true)} // Open modal
            >
              <Settings className="w-5 h-5" /> Settings
            </Button>

            <Button
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" /> Logout
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white rounded-lg shadow-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Settings & Suggestions</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-700">🔹 Enable Dark Mode (Coming Soon)</p>
            <p className="text-gray-700">🔹 Notification Preferences</p>
            <p className="text-gray-700">🔹 Manage Privacy & Security</p>
            <p className="text-gray-700">🔹 App Version: 1.0.0</p>
          </div>
          <Button className="w-full mt-4 bg-gray-600 hover:bg-gray-700" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
