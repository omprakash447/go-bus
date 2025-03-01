"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";

export default function Services() {
  const [] = useState(null);

  // Function to get current location
  // const getCurrentLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setCurrentLocation({
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         });
  //         alert(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
  //       },
  //       (error) => {
  //         alert("Error getting location: " + error.message);
  //       }
  //     );
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Our Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Booking a Bus */}
        <Card className="bg-black text-white">
          <CardHeader>
            <CardTitle>Book a Bus</CardTitle>
            <CardDescription>Reserve your seat online with ease.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Find the best bus options and book tickets instantly.</p>
          </CardContent>
          <CardFooter>
            <Button className="bg-white text-black hover:bg-gray-300 w-full"><Link href="/services/busbooking">Book Now</Link></Button>
          </CardFooter>
        </Card>


        {/* Track Current Location */}
        <Card className="bg-black text-white">
          <CardHeader>
            <CardTitle>Track Current Location</CardTitle>
            <CardDescription>Find where you are right now.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Get your real-time GPS location instantly.</p>
          </CardContent>
          <CardFooter>
            <Button className="bg-white text-black hover:bg-gray-300 w-full">
              <Link href="/services/track-currentlocation">Get Location</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Bus Schedule */}
        <Card className="bg-black text-white">
          <CardHeader>
            <CardTitle>Bus Schedule</CardTitle>
            <CardDescription>Check bus timings and availability.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Stay updated with real-time schedules.</p>
          </CardContent>
          <CardFooter>
            <Button className="bg-white text-black hover:bg-gray-300 w-full"><Link href="services/bus-schedule">View Schedule</Link></Button>
          </CardFooter>
        </Card>

        {/* Nearby Bus Stops */}
        <Card className="bg-black text-white">
          <CardHeader>
            <CardTitle>Nearby Bus Stops</CardTitle>
            <CardDescription>Find the nearest bus stops easily.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Locate the closest bus stops in your area.</p>
          </CardContent>
          <CardFooter>
            <Button className="bg-white text-black hover:bg-gray-300 w-full"><Link href="services/nearbybusstop">Find Now</Link></Button>
          </CardFooter>
        </Card>

        {/* Live Bus Tracking */}
        <Card className="bg-black text-white">
          <CardHeader>
            <CardTitle>Live Bus Tracking</CardTitle>
            <CardDescription>See where your bus is in real-time.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Get live updates on your bus location and arrival time.</p>
          </CardContent>
          <CardFooter>
            <Button className="bg-white text-black hover:bg-gray-300 w-full"><Link href="/services/trackbooking">Track Now</Link></Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
