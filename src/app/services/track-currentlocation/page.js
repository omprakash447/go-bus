"use client";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

// Dynamically import components
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

// Custom marker icon
const customIcon = new Icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

// Helper component to update the map view
function UpdateMapView({ location }) {
  const map = useMap(); // Get the map instance

  useEffect(() => {
    if (location && map) {
      map.setView([location.latitude, location.longitude], 16);
    }
  }, [location, map]);

  return null; // This component doesn't render anything
}

export default function TrackCurrentLocation() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setLocation({ latitude, longitude });

          // Reverse Geocoding for Address
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setAddress(data.display_name || "Address not found");
          } catch (error) {
            console.error("Error fetching address:", error);
            setAddress("Unable to fetch address");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setAddress("Unable to get location.");
        },
        { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-white text-black p-4">
      <h1 className="text-3xl font-extrabold mb-6 text-center">Track Your Location in Real-Time</h1>

      <div className="bg-black text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2 text-center">Your Position</h2>
        {location ? (
          <>
            <p><strong>Latitude:</strong> {location.latitude}</p>
            <p><strong>Longitude:</strong> {location.longitude}</p>
            <p><strong>Address:</strong> {address}</p>
          </>
        ) : (
          <p className="text-gray-300 text-center">Waiting for location updates...</p>
        )}
      </div>

      {/* Leaflet Map */}
      {location && (
        <div className="mt-6 w-full max-w-3xl rounded-lg overflow-hidden shadow-lg">
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={16}
            scrollWheelZoom={true}
            className="w-full h-96"
            style={{ height: "70vh", width: "100%" }}
          >
            {/* Helper component to update map view */}
            <UpdateMapView location={location} />

            <TileLayer
              url="https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
            <Marker position={[location.latitude, location.longitude]} icon={customIcon}>
              <Popup>{address ? address : "Your Location"}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}
