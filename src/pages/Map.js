import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { marker } from "leaflet";
import fetchData from "./api/API";
import L from "leaflet";
import { LocationMarker } from "./Utils/HelperFunc";
import Stack from "@mui/material/Stack";
import "./pages.css";
import MapButton from "./MapButton.jsx";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const API = "https://geoserver.nottinghamcity.gov.uk/parking/defstatus.json";

  useEffect(() => {
    const getMarkers = async () => {
      const data = await fetchData(API);
      setMarkers(data);
    };

    getMarkers();
  }, [API]);

  const defaultPosition = [52.95435, -1.14956];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <MapContainer
          style={{ height: "60vh", width: "80vw", maxWidth: "100%" }}
          center={defaultPosition}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map(({ id, name, capacity, occupation, position }) => (
            <Marker key={id} position={position}>
              <Popup>
                {name}, {capacity} spaces, {occupation}% occupied
              </Popup>
            </Marker>
          ))}
          {}
          <Stack
            direction="row"
            spacing={2}
            style={{
              position: "absolute",
              top: "0%",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <MapButton text="Bus Stops" />
            <MapButton text="Tram Stops" />
          </Stack>
          {}
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
