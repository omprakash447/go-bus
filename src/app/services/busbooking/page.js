"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

const busIcons = ["🚌", "🚍", "🚎", "🚐", "🚔", "🚖", "🚙", "🚛", "🚜", "🚑"]

const stops = [
    { name: "Baramunda", lat: 20.2761, lon: 85.7858, color: "red" },
    { name: "Baramunda Road", lat: 20.270674, lon: 85.793478, color: "aqua" },
    { name: "Khandagiri", lat: 20.2514, lon: 85.7856, color: "blue" },
    { name: "Jaydev Vihar", lat: 20.2961, lon: 85.8171, color: "green" },
    { name: "Master Canteen", lat: 20.2677, lon: 85.84, color: "orange" },
    { name: "Vani Vihar", lat: 20.292, lon: 85.8264, color: "purple" },
    { name: "Rasulgarh", lat: 20.3079, lon: 85.8463, color: "brown" },
    { name: "Phulnakhara", lat: 20.3684, lon: 85.9024, color: "yellow" },
    { name: "Cuttack Badambadi", lat: 20.4625, lon: 85.8793, color: "black" },
    { name: "Chandrasekharpur", lat: 20.3425, lon: 85.8181, color: "blue" },
    { name: "Police Station Square", lat: 20.2965, lon: 85.8245, color: "gray" },
    { name: "Patia", lat: 20.3553, lon: 85.8195, color: "cyan" },
    { name: "Niladri Vihar", lat: 20.3333, lon: 85.8142, color: "magenta" },
    { name: "Sailashree Vihar", lat: 20.3290, lon: 85.8210, color: "lime" },
    { name: "Damana", lat: 20.3245, lon: 85.8280, color: "teal" },
    { name: "Kalinga Hospital Square", lat: 20.3120, lon: 85.8190, color: "navy" },
    { name: "Sainik School", lat: 20.3065, lon: 85.8185, color: "olive" },
    { name: "Acharya Vihar", lat: 20.2960, lon: 85.8240, color: "maroon" },
    { name: "Kalpana Square", lat: 20.2450, lon: 85.8390, color: "silver" },
    { name: "Infocity", lat: 20.3575, lon: 85.8150, color: "gold" },
    { name: "KIIT Square", lat: 20.3530, lon: 85.8140, color: "coral" },
    { name: "Nandankanan", lat: 20.3960, lon: 85.8180, color: "orchid" },
    { name: "Airport", lat: 20.2520, lon: 85.8170, color: "salmon" },
    { name: "Biju Patnaik Park", lat: 20.2710, lon: 85.8330, color: "khaki" },
    { name: "AG Square", lat: 20.2760, lon: 85.8360, color: "plum" },
    { name: "Lingipur", lat: 20.2090, lon: 85.8410, color: "peru" },
    { name: "National Law University", lat: 20.5000, lon: 85.8790, color: "azure" },
    { name: "Barabati Stadium", lat: 20.4720, lon: 85.8890, color: "lavender" },
    { name: "Jagatpur", lat: 20.5200, lon: 85.9000, color: "beige" },
    { name: "AIIMS Bhubaneswar", lat: 20.2330, lon: 85.7890, color: "mint" },
    { name: "OMP Square", lat: 20.4850, lon: 85.8790, color: "ivory" },
    { name: "Mahanadi Vihar", lat: 20.4800, lon: 85.9000, color: "peach" },
    { name: "Khordha New Bus Stand", lat: 20.1820, lon: 85.6200, color: "limegreen" },
    { name: "Odisha University of Agriculture and Technology", lat: 20.2720, lon: 85.8190, color: "skyblue" },
    { name: "Jatani Gate", lat: 20.1590, lon: 85.7070, color: "tomato" },
    { name: "Institute of Medical Sciences and Sum Hospital", lat: 20.2560, lon: 85.7860, color: "wheat" },
    { name: "Kalinga Vihar", lat: 20.2700, lon: 85.7850, color: "seagreen" },
    { name: "Sai Mandir", lat: 20.2900, lon: 85.8400, color: "slateblue" },
    { name: "Dumduma", lat: 20.2500, lon: 85.7900, color: "sienna" },
    { name: "Gadakana", lat: 20.3200, lon: 85.8500, color: "steelblue" },
    { name: "Chakeisaini", lat: 20.3100, lon: 85.8600, color: "tan" },
    { name: "Jadupur", lat: 20.2400, lon: 85.7800, color: "thistle" },
    { name: "Trident Galaxy", lat: 20.2700, lon: 85.7800, color: "turquoise" }
]

const busSchedule = [
    { name: "Bus 1", time: "08:00 AM", side: "A" },
    { name: "Bus 2", time: "09:30 AM", side: "A" },
    { name: "Bus 3", time: "11:00 AM", side: "A" },
    { name: "Bus 4", time: "02:00 PM", side: "A" },
    { name: "Bus 5", time: "04:30 PM", side: "A" },
    { name: "Bus 6", time: "06:00 PM", side: "B" },
    { name: "Bus 7", time: "07:30 PM", side: "B" },
    { name: "Bus 8", time: "09:00 PM", side: "B" },
    { name: "Bus 9", time: "10:30 PM", side: "B" },
    { name: "Bus 10", time: "11:45 PM", side: "B" },
]

const busIcon = new L.Icon({
    iconUrl: "https://fonts.gstatic.com/s/i/materialicons/directions_bus/v10/24px.svg",
    iconSize: [30, 30],
})

export default function BookBus() {
    const [, setCurrentTime] = useState(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
    )
    const [currentBus, setCurrentBus] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedBus, setSelectedBus] = useState(null)
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [distance, setDistance] = useState(null)
    const [price, setPrice] = useState(null)
    const [addbooking, setaddbooking] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
            setCurrentTime(now)

            const nextBus = busSchedule.find((bus) => bus.time === now)
            if (nextBus) {
                setCurrentBus(nextBus)
            }
        }, 60000)

        return () => clearInterval(interval)
    }, [])

    const openBookingDialog = (bus) => {
        setSelectedBus(bus)
        setIsDialogOpen(true)
    }

    const calculateDistance = () => {
        const fromStop = stops.find((stop) => stop.name === from)
        const toStop = stops.find((stop) => stop.name === to)
        if (fromStop && toStop) {
            const distance = calculateHaversineDistance(fromStop, toStop)
            setDistance(distance)
            setPrice(distance * 3)
        }
    }

    const confirmBooking = async (e) => {
        e.preventDefault();

        if (!selectedBus || !from || !to || !distance || !price) {
            toast.error("Please fill in all booking details before confirming.", {
                style: {
                    background: '#333',
                    color: '#fff',
                },
            });
            return;
        }

        try {
            const newBooking = {
                bus: selectedBus.name, // ✅ Ensure only a string is sent
                from,
                to,
                distance,
                price,
            };

            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newBooking),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Booking successful:", data);
                toast.success(`Your booking for ${selectedBus.name} from ${from} to ${to} has been confirmed.`, {
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                });
            } else {
                console.error("Booking failed:", data);
                toast.error(data.message || "Something went wrong. Please try again.", {
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                });
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("An error occurred while processing your booking.", {
                style: {
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    };

    return (
        <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 py-6">
            {/* Heading */}
            <h1 className="text-4xl font-bold mb-4">Book Your Bus</h1>
            <p className="text-lg text-gray-600 mb-6">Select your bus and view real-time routes & schedules.</p>

            {/* Sections: Day & Night Services */}
            <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
                {/* Side A: Day Services */}
                <div className="w-full md:w-1/2 bg-gray-200 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-3">Day Services 🌞</h2>
                    {busSchedule
                        .filter((bus) => bus.side === "A")
                        .map((bus, index) => (
                            <div key={index} className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm mb-2">
                                <span>
                                    {busIcons[index]} {bus.name}{" "}
                                </span>
                                <span className="text-gray-600">{bus.time}</span>
                                <Button onClick={() => openBookingDialog(bus)}>Book</Button>
                            </div>
                        ))}
                </div>

                {/* Side B: Night Services */}
                <div className="w-full md:w-1/2 bg-gray-800 text-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-3">Night Services 🌙</h2>
                    {busSchedule
                        .filter((bus) => bus.side === "B")
                        .map((bus, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-700 p-3 rounded-md shadow-sm mb-2">
                                <span>
                                    {busIcons[index + 5]} {bus.name}{" "}
                                </span>
                                <span className="text-gray-300">{bus.time}</span>
                                <Button onClick={() => openBookingDialog(bus)}>Book</Button>
                            </div>
                        ))}
                </div>
            </div>

            {/* leaf let map */}
            <div className="relative flex flex-col w-full max-w-4xl mt-6 p-4">
                <div className="relative h-[calc(100vh-80px)] w-full overflow-hidden z-0">
                    <MapContainer
                        center={[20.2961, 85.8171]}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                        className="rounded-lg shadow-lg"
                    >
                        {/* map */}
                        <TileLayer
                            url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                            attribution="&copy; Google"
                        />

                        {/* stopeges will show on the map */}
                        {stops.map((stop, index) => (
                            <Marker key={index} position={[stop.lat, stop.lon]} icon={busIcon}>
                                <Tooltip>{stop.name}</Tooltip>
                            </Marker>
                        ))}

                        {/* Current Bus */}
                        {currentBus && (
                            <Marker position={[stops[0].lat, stops[0].lon]} icon={busIcon}>
                                <Tooltip>
                                    {currentBus.name} (Departing: {currentBus.time})
                                </Tooltip>
                            </Marker>
                        )}
                    </MapContainer>
                </div>
            </div>

            {/* booking code */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Book Your Bus</DialogTitle>
                        <DialogDescription>
                            {selectedBus && `Booking for ${selectedBus.name} at ${selectedBus.time}`}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Select onValueChange={setFrom}>
                            <SelectTrigger>
                                <SelectValue placeholder="From" />
                            </SelectTrigger>
                            <SelectContent>
                                {stops.map((stop, index) => (
                                    <SelectItem key={index} value={stop.name}>
                                        {stop.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select onValueChange={setTo}>
                            <SelectTrigger>
                                <SelectValue placeholder="To" />
                            </SelectTrigger>
                            <SelectContent>
                                {stops.map((stop, index) => (
                                    <SelectItem key={index} value={stop.name}>
                                        {stop.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button onClick={calculateDistance}>Display Kilometer with Price</Button>
                        {distance && price && (
                            <p>
                                Distance: {distance.toFixed(2)} km, Price: ₹{price.toFixed(2)}
                            </p>
                        )}
                        <Button onClick={confirmBooking}>Confirm Booking</Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* React Hot Toast Container */}
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                }}
            />
        </div>
    )
}

// Helper function to calculate distance between two points
function calculateHaversineDistance(point1, point2) {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = ((point2.lat - point1.lat) * Math.PI) / 180
    const dLon = ((point2.lon - point1.lon) * Math.PI) / 180
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((point1.lat * Math.PI) / 180) *
        Math.cos((point2.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // Distance in kilometers
    return distance
}

