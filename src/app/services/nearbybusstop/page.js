"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const ZoomControl = dynamic(() => import('react-leaflet').then(mod => mod.ZoomControl), { ssr: false });

let L;
if (typeof window !== 'undefined') {
  L = require('leaflet');
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

const stops = [
  { name: "Baramunda", lat: 20.2761, lon: 85.7858, color: "red", nextArrival: "5 min" },
  { name: "Baramunda Road", lat: 20.270674, lon: 85.793478, color: "aqua", nextArrival: "8 min" },
  { name: "Trident Galaxy", lat: 20.2700, lon: 85.7800, color: "turquoise", nextArrival: "12 min" }
];

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2);
};

export default function NearbyBusStop() {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyStops, setNearbyStops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [map, setMap] = useState(null);

  const getLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          const stopsWithDistance = stops.map(stop => ({
            ...stop,
            distance: calculateDistance(latitude, longitude, stop.lat, stop.lon)
          })).sort((a, b) => a.distance - b.distance);

          setNearbyStops(stopsWithDistance);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
          alert("Unable to get your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  };

  const centerOnUser = () => {
    if (map && userLocation) {
      map.flyTo([userLocation.lat, userLocation.lng], 13);
    }
  };

  const filteredStops = nearbyStops.filter(stop =>
    stop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!userLocation && !loading) {
      getLocation();
    }
  }, []);

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Track Nearby Bus Stops</h1>

      <div className="flex gap-2 mb-4">
        <Button
          onClick={getLocation}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? "Locating..." : "Find My Location"}
        </Button>
        {userLocation && (
          <Button
            onClick={centerOnUser}
            className="bg-green-600 hover:bg-green-700"
          >
            Center on Me
          </Button>
        )}
      </div>

      {userLocation && L && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Nearby Stops</CardTitle>
              <Input
                placeholder="Search stops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-2"
              />
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 max-h-[400px] overflow-y-auto">
                {filteredStops.slice(0, 5).map((stop, index) => (
                  <li key={index} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: stop.color }}
                    />
                    <div>
                      <span className="font-medium">{stop.name}</span>
                      <div className="text-sm text-gray-600">
                        {stop.distance} km • Next bus: {stop.nextArrival}
                      </div>
                    </div>
                  </li>
                ))}
                {filteredStops.length === 0 && (
                  <li className="text-gray-500">No stops found</li>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Map</CardTitle>
            </CardHeader>
            <CardContent>
              <MapContainer
                center={[userLocation.lat, userLocation.lng]}
                zoom={13}
                style={{ height: "400px", width: "100%" }}
                whenCreated={setMap}
              >
                <TileLayer
                  url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                  subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                  attribution="&copy; Google"
                />
                <ZoomControl position="topright" />
                <Marker position={[userLocation.lat, userLocation.lng]}>
                  <Popup>Your Location</Popup>
                </Marker>
                {filteredStops.map((stop, index) => (
                  <Marker
                    key={index}
                    position={[stop.lat, stop.lon]}
                    icon={L.divIcon({
                      html: `<div style="background-color: ${stop.color}; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white;"></div>`,
                      className: "custom-marker",
                      iconSize: [15, 15]
                    })}
                  >
                    <Popup>
                      <div>
                        <strong>{stop.name}</strong><br />
                        Distance: {stop.distance} km<br />
                        Next Arrival: {stop.nextArrival}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}