"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, Headphones, Mail, MapPin, PhoneCall, Search, ShieldCheck, Ticket, User, XCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      
      <h1 className="text-3xl font-bold text-black mb-8">📞 Contact & Services</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        
        {/* Owner/Developer Card */}
        <Card className="bg-black text-white shadow-lg border border-gray-700">
          <CardHeader className="text-center">
            <img
              src="https://avatars.githubusercontent.com/u/150693046?v=4?s=400"
              alt="Om Prakash Lenka"
              className="w-28 h-28 rounded-full mx-auto border-2 border-gray-500"
            />
            <CardTitle className="text-2xl mt-3">Om Prakash Lenka</CardTitle>
            <p className="text-gray-400 text-sm">Founder & Developer</p>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <div className="flex items-center gap-3">
              <User className="text-blue-400 w-5 h-5" />
              <p>Age: <span className="font-semibold text-white">19</span></p>
            </div>
            <div className="flex items-center gap-3">
              <PhoneCall className="text-blue-400 w-5 h-5" />
              <p>Phone: <a href="tel:9178330413" className="text-white font-semibold">+91 9178330413</a></p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-blue-400 w-5 h-5" />
              <p>Email: <a href="mailto:gobus@gmail.com" className="text-white font-semibold">gobus@gmail.com</a></p>
            </div>
          </CardContent>
        </Card>

        {/* Customer Support */}
        <Card className="bg-black text-white shadow-lg border border-gray-700">
          <CardHeader className="text-center">
            <Headphones className="text-blue-400 w-10 h-10 mx-auto" />
            <CardTitle className="text-2xl mt-3">Customer Support</CardTitle>
            <p className="text-gray-400 text-sm">Available 24/7</p>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <PhoneCall className="text-blue-400 w-5 h-5" />
            <p>Helpline: <a href="tel:1800-123-4567" className="text-white font-semibold">1800-123-4567</a></p>
          </CardContent>
        </Card>

        {/* Office Address */}
        <Card className="bg-black text-white shadow-lg border border-gray-700">
          <CardHeader className="text-center">
            <MapPin className="text-blue-400 w-10 h-10 mx-auto" />
            <CardTitle className="text-2xl mt-3">Head Office</CardTitle>
            <p className="text-gray-400 text-sm">Baramunda, Bhubaneswar</p>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <PhoneCall className="text-blue-400 w-5 h-5" />
            <p>Office Contact: <a href="tel:+91-9123456789" className="text-white font-semibold">+91-9123456789</a></p>
          </CardContent>
        </Card>

        {/* Booking Assistance */}
        <Card className="bg-black text-white shadow-lg border border-gray-700">
          <CardHeader className="text-center">
            <Bus className="text-blue-400 w-10 h-10 mx-auto" />
            <CardTitle className="text-2xl mt-3">Booking Assistance</CardTitle>
            <p className="text-gray-400 text-sm">Need help with booking?</p>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <PhoneCall className="text-blue-400 w-5 h-5" />
            <p>Helpline: <a href="tel:+91-9876543210" className="text-white font-semibold">+91-9876543210</a></p>
          </CardContent>
        </Card>

        {/* Lost & Found */}
        <Card className="bg-black text-white shadow-lg border border-gray-700">
          <CardHeader className="text-center">
            <Search className="text-blue-400 w-10 h-10 mx-auto" />
            <CardTitle className="text-2xl mt-3">Lost & Found</CardTitle>
            <p className="text-gray-400 text-sm">Report lost items</p>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p>Email: <a href="mailto:lost@gobus.com" className="text-white font-semibold">lost@gobus.com</a></p>
          </CardContent>
        </Card>

        {/* Travel Insurance */}
        <Card className="bg-black text-white shadow-lg border border-gray-700">
          <CardHeader className="text-center">
            <ShieldCheck className="text-blue-400 w-10 h-10 mx-auto" />
            <CardTitle className="text-2xl mt-3">Travel Insurance</CardTitle>
            <p className="text-gray-400 text-sm">Secure your journey</p>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p>Email: <a href="mailto:insurance@gobus.com" className="text-white font-semibold">insurance@gobus.com</a></p>
          </CardContent>
        </Card>

        {/* Refund & Cancellation */}
        <Card className="bg-black text-white shadow-lg border border-gray-700">
          <CardHeader className="text-center">
            <XCircle className="text-red-400 w-10 h-10 mx-auto" />
            <CardTitle className="text-2xl mt-3">Refund & Cancellation</CardTitle>
            <p className="text-gray-400 text-sm">Cancel bookings easily</p>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p>Email: <a href="mailto:refund@gobus.com" className="text-white font-semibold">refund@gobus.com</a></p>
          </CardContent>
        </Card>

        {/* Route Assistance */}
        <Card className="bg-black text-white shadow-lg border border-gray-700">
          <CardHeader className="text-center">
            <MapPin className="text-blue-400 w-10 h-10 mx-auto" />
            <CardTitle className="text-2xl mt-3">Route Assistance</CardTitle>
            <p className="text-gray-400 text-sm">Plan your travel</p>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p>Email: <a href="mailto:route@gobus.com" className="text-white font-semibold">route@gobus.com</a></p>
          </CardContent>
        </Card>

        {/* VIP Membership */}
        <Card className="bg-black text-white shadow-lg border border-gray-700">
          <CardHeader className="text-center">
            <Ticket className="text-yellow-400 w-10 h-10 mx-auto" />
            <CardTitle className="text-2xl mt-3">VIP Membership</CardTitle>
            <p className="text-gray-400 text-sm">Exclusive benefits</p>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p>Email: <a href="mailto:vip@gobus.com" className="text-white font-semibold">vip@gobus.com</a></p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
