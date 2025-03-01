"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";

// Custom icons
const personIcon = new L.Icon({
    iconUrl: "https://cdn.pixabay.com/animation/2023/04/06/16/10/16-10-43-442_512.gif",
    iconSize: [100, 100],
    iconAnchor: [50, 90],
    popupAnchor: [0, -35]
});

const homeIcon = new L.Icon({
    iconUrl: "https://media.giphy.com/media/cKW0BJ33aO8ZcF7wlo/giphy.gif",
    iconSize: [100, 100],
    iconAnchor: [50, 90],
    popupAnchor: [0, -35]
});

export default function TracBus() {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [route, setRoute] = useState([]);
    const [fromCoords, setFromCoords] = useState(null);
    const [toCoords, setToCoords] = useState(null);
    const [mapType, setMapType] = useState("street");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/getbookings");
                const data = await response.json();
                console.log("Fetched Bookings Data:", data);

                if (response.ok) {
                    if (Array.isArray(data.message)) {
                        setBookings(data.message);
                    } else {
                        console.error("Expected an array but got:", data.message);
                        setBookings([]);
                    }
                } else {
                    console.error("Error fetching bookings:", data.message);
                    setBookings([]);
                }
            } catch (err) {
                console.error("Error:", err);
                setBookings([]);
            }
        };

        fetchBookings();
    }, []);

    // Function to get coordinates using OpenStreetMap Nominatim API
    const getCoordinates = async (location) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
            );
            const data = await response.json();
            if (data.length > 0) {
                return {
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon),
                };
            } else {
                console.error("No coordinates found for:", location);
                return null;
            }
        } catch (error) {
            console.error("Error fetching coordinates:", error);
            return null;
        }
    };

    // Open the full-screen popup and fetch the route
    const openMapPopup = async (booking) => {
        setSelectedBooking(booking);
        setShowPopup(true);

        const fromCoordinates = await getCoordinates(booking.from);
        const toCoordinates = await getCoordinates(booking.to);

        if (fromCoordinates && toCoordinates) {
            setFromCoords(fromCoordinates);
            setToCoords(toCoordinates);
            setRoute([[fromCoordinates.lat, fromCoordinates.lng], [toCoordinates.lat, toCoordinates.lng]]);
        }
    };

    // Close the popup
    const closeMapPopup = () => {
        setShowPopup(false);
        setSelectedBooking(null);
        setRoute([]);
    };

    // Different map layers
    const mapLayers = {
        street: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        watercolor: "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
        transport: "https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png",
    };


    return (
        <div className="p-6 bg-white min-h-screen text-black">
            <h1 className="text-3xl font-bold mb-6 text-center border-b pb-3">All Bus Bookings</h1>

            {bookings.length === 0 ? (
                <p className="text-center text-gray-500">No bookings found.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking, index) => (
                        <div key={index} className="border border-gray-700 p-6 rounded-lg shadow-lg bg-black text-white">
                            <h2 className="text-xl font-semibold">{booking.bus}</h2>
                            <p className="text-gray-300">From: <span className="font-medium">{booking.from}</span></p>
                            <p className="text-gray-300">To: <span className="font-medium">{booking.to}</span></p>
                            <p className="text-gray-300">Distance: <span className="font-medium">{booking.distance} km</span></p>
                            <p className="text-gray-300">Price: <span className="font-medium">₹{booking.price}</span></p>

                            <button
                                className="mt-4 px-4 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-200"
                                onClick={() => openMapPopup(booking)}
                            >
                                Track
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Full-screen Map Popup */}
            {showPopup && selectedBooking && fromCoords && toCoords && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative bg-white w-[90%] h-[80%] p-4 rounded-lg shadow-xl">
                        <button
                            className="absolute top-3 right-3 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                            onClick={closeMapPopup}
                        >
                            Close
                        </button>

                        <h2 className="text-xl font-bold mb-3 text-center">Tracking Bus</h2>

                        {/* Map Type Selector */}
                        <div className="flex gap-3 mb-3 justify-center">
                            {Object.keys(mapLayers).map((type) => (
                                <button
                                    key={type}
                                    className={`px-4 py-2 rounded-md ${mapType === type ? "bg-black text-white" : "bg-gray-200 text-black"
                                        }`}
                                    onClick={() => setMapType(type)}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                            <div className="relative bg-white w-[90%] h-[85%] p-4 rounded-lg shadow-xl flex flex-col">
                                <button
                                    className="absolute top-3 right-3 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                                    onClick={closeMapPopup}
                                >
                                    Close
                                </button>

                                <h2 className="text-xl font-bold mb-3 text-center">Tracking Bus</h2>

                                {/* **Map Type Selector** */}
                                <div className="flex justify-center gap-3 mb-3 flex-wrap">
                                    {Object.keys(mapLayers).map((type) => (
                                        <button
                                            key={type}
                                            className={`px-4 py-2 rounded-md ${mapType === type ? "bg-black text-white" : "bg-gray-200 text-black"
                                                }`}
                                            onClick={() => setMapType(type)}
                                        >
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </button>
                                    ))}
                                </div>

                                {/* **Map Container (Ensures Proper Fit)** */}
                                <div className="flex-grow w-full rounded-lg overflow-hidden">
                                    <MapContainer
                                        center={[fromCoords.lat, fromCoords.lng]}
                                        zoom={13}
                                        className="h-full w-full"
                                        whenCreated={(map) => setTimeout(() => map.invalidateSize(), 100)}
                                    >
                                        <TileLayer url={mapLayers[mapType]} attribution="&copy; OpenStreetMap contributors" />

                                        <Marker position={[fromCoords.lat, fromCoords.lng]} icon={personIcon}>
                                            <Popup>{selectedBooking.from}</Popup>
                                        </Marker>

                                        <Marker position={[toCoords.lat, toCoords.lng]} icon={homeIcon}>
                                            <Popup>{selectedBooking.to}</Popup>
                                        </Marker>

                                        {route.length > 0 && <Polyline positions={route} color="#00FFFF" weight={8} opacity={0.9} />}
                                    </MapContainer>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
