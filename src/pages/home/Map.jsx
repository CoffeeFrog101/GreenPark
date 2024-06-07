import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import fetchData from "../api/API.jsx";
import L from "leaflet";
import { LocationMarker } from "../utils/HelperFunc.js";
import Stack from "@mui/material/Stack";
import "./home.css";
import MapButton from "./MapButton.jsx";
import SearchBar from "./SearchBar.jsx";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Map = ({ searchTerm }) => {
  const [markers, setMarkers] = useState([]);
  const API = "https://geoserver.nottinghamcity.gov.uk/parking/defstatus.json";
  //const TotonApi="https://services.arcgis.com/yvqphKcf9bBSnjX1/arcgis/rest/services/Tram_Stops/FeatureServer/62/query?where=Stop_Name%20%3D%20%27TOTON%20LANE%20PARK%20AND%20RIDE%27%20OR%20Stop_Name%20%3D%20%27ESKDALE%20DRIVE%27%20OR%20Stop_Name%20%3D%20%27CATOR%20LANE%27%20OR%20Stop_Name%20%3D%20%27BEESTON%20TOWN%20CENTRE%27%20OR%20Stop_Name%20%3D%20%27UNIVERSITY%20BOULEVARD%27%20OR%20Stop_Name%20%3D%20%27UNIVERSITY%20OF%20NOTTINGHAM%27%20OR%20Stop_Name%20%3D%20%27QMC%27%20OR%20Stop_Name%20%3D%20%27NG2%27%20OR%20Stop_Name%20%3D%20%27NOTTINGHAM%20STATION%27%20OR%20Stop_Name%20%3D%20%27LACE%20MARKET%27%20OR%20Stop_Name%20%3D%20%27OLD%20MARKET%20SQUARE%27&outFields=*&outSR=4326&f=json"
  //const API ="https://services.arcgis.com/yvqphKcf9bBSnjX1/arcgis/rest/services/Park_and_Ride/FeatureServer/43/query?outFields=*&where=1%3D1&f=geojson";

  useEffect(() => {
    const getMarkers = async () => {
      const data = await fetchData(API);
      setMarkers(data);
    };

    getMarkers();
  }, [API]);

  const filteredMarkers = markers.filter((marker) =>
    marker.name.toLowerCase().includes(searchTerm)
  );

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
          {filteredMarkers.map(({ id, name, capacity, status, position }) => (
            <Marker key={id} position={position}>
              <Popup>
                {name}
                <br /> {capacity} spaces
                <br /> The park is {status}.
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
