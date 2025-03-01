"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

// Bus Schedule Data
const busSchedule = [
  { route: "Baramunda → Badambadi", bus: "Bus 1", shift: "Day", departure: "08:00 AM", arrival: "09:30 AM" },
  { route: "Baramunda → Badambadi", bus: "Bus 2", shift: "Day", departure: "09:30 AM", arrival: "11:00 AM" },
  { route: "Baramunda → Badambadi", bus: "Bus 3", shift: "Day", departure: "11:00 AM", arrival: "12:30 PM" },
  { route: "Baramunda → Badambadi", bus: "Bus 4", shift: "Day", departure: "02:00 PM", arrival: "03:30 PM" },
  { route: "Baramunda → Badambadi", bus: "Bus 5", shift: "Day", departure: "04:30 PM", arrival: "06:00 PM" },
  { route: "Baramunda → Badambadi", bus: "Bus 6", shift: "Night", departure: "06:00 PM", arrival: "07:30 PM" },
  { route: "Baramunda → Badambadi", bus: "Bus 7", shift: "Night", departure: "07:30 PM", arrival: "09:00 PM" },
  { route: "Baramunda → Badambadi", bus: "Bus 8", shift: "Night", departure: "09:00 PM", arrival: "10:30 PM" },
  { route: "Baramunda → Badambadi", bus: "Bus 9", shift: "Night", departure: "10:30 PM", arrival: "12:00 AM" },
  { route: "Baramunda → Badambadi", bus: "Bus 10", shift: "Night", departure: "12:00 AM", arrival: "01:30 AM" }
];

// Extract service start and end times
const serviceStartTime = busSchedule[0].departure; // First bus departure
const serviceEndTime = busSchedule[busSchedule.length - 1].arrival; // Last bus arrival

export default function Schedule() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeBus, setActiveBus] = useState(null);
  const [serviceAvailable, setServiceAvailable] = useState(true);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Convert 12-hour format (AM/PM) to 24-hour format
  const convertTo24HourFormat = (timeStr) => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return { hours, minutes };
  };

  // Function to determine the active bus and service status
  const getActiveBus = () => {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;

    let foundBus = busSchedule.find((bus) => {
      const departureTime = convertTo24HourFormat(bus.departure);
      const arrivalTime = convertTo24HourFormat(bus.arrival);

      const departureInMinutes = departureTime.hours * 60 + departureTime.minutes;
      const arrivalInMinutes = arrivalTime.hours * 60 + arrivalTime.minutes;

      return departureInMinutes <= currentTimeInMinutes && currentTimeInMinutes < arrivalInMinutes;
    });

    setServiceAvailable(!!foundBus);
    return foundBus;
  };

  // Update active bus and service availability
  useEffect(() => {
    setActiveBus(getActiveBus());
  }, [currentTime]);

  return (
    <div className="min-h-screen bg-gray-100 text-black flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4">Go Bus Schedule</h1>

      {/* Real-Time Clock */}
      <div className="text-2xl font-bold text-blue-600 mb-6">
        Current Time: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
      </div>

      {/* Show Service Hours */}
      <div className="text-xl font-semibold text-green-700 mb-4">
        🕒 Service Available from {serviceStartTime} to {serviceEndTime}
      </div>

      {/* Show Service Availability Message */}
      {!serviceAvailable && (
        <div className="text-2xl font-semibold text-red-600 mt-4">
          🚫 No service available at this time!
        </div>
      )}

      {/* 📌 Day Service Section */}
      <section className="w-full max-w-6xl mb-8">
        <Card className="shadow-lg mb-4">
          <CardHeader className="bg-blue-500 text-white">
            <CardTitle>Day Service Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-300 text-black">
                  <TableHead>Route</TableHead>
                  <TableHead>Bus</TableHead>
                  <TableHead>Departure</TableHead>
                  <TableHead>Arrival</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {busSchedule
                  .filter(bus => bus.shift === "Day")
                  .map((bus, index) => (
                    <TableRow
                      key={index}
                      className={activeBus && activeBus.bus === bus.bus ? "bg-yellow-200 animate-pulse glow" : ""}
                    >
                      <TableCell>{bus.route}</TableCell>
                      <TableCell>{bus.bus}</TableCell>
                      <TableCell>{bus.departure}</TableCell>
                      <TableCell>{bus.arrival}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* 📌 Night Service Section */}
      <section className="w-full max-w-6xl">
        <Card className="shadow-lg">
          <CardHeader className="bg-gray-800 text-white">
            <CardTitle>Night Service Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-300 text-black">
                  <TableHead>Route</TableHead>
                  <TableHead>Bus</TableHead>
                  <TableHead>Departure</TableHead>
                  <TableHead>Arrival</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {busSchedule
                  .filter(bus => bus.shift === "Night")
                  .map((bus, index) => (
                    <TableRow
                      key={index}
                      className={activeBus && activeBus.bus === bus.bus ? "bg-yellow-200 animate-pulse glow" : ""}
                    >
                      <TableCell>{bus.route}</TableCell>
                      <TableCell>{bus.bus}</TableCell>
                      <TableCell>{bus.departure}</TableCell>
                      <TableCell>{bus.arrival}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
