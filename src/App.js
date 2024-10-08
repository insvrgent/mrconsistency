import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function App() {
  useEffect(() => {
    const map = L.map("map").setView([51.505, -0.09], 13); // Set default view

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Get user's location
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
      const { latitude, longitude } = position.coords;

      // Marker untuk posisi user
      const userMarker = L.marker([latitude, longitude]).addTo(map);
      map.setView([latitude, longitude], 13);

      // Panggil fungsi untuk mencari jalan terdekat
      findNearestRoad(latitude, longitude);
    }

    function error() {
      console.error("Unable to retrieve your location.");
    }

    // Fungsi untuk menemukan jalan terdekat (misalnya menggunakan API OpenStreetMap)
    async function findNearestRoad(lat, lon) {
      // Implementasi untuk mencari jalan terdekat di OpenStreetMap
      const response = await fetch(
        `https://api.openstreetmap.org/api/0.6/road/${lat}/${lon}`
      );
      const data = await response.json();
      // Logika untuk menempatkan marker di jalan terdekat
    }

    // Cleanup
    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "500px" }} />;
}
