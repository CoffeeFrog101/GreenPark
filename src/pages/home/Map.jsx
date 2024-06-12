import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import fetchData from "../api/API.jsx";
import L from "leaflet";
import {
  LocationMarker,
  busStopIcon,
  tramStopIcon,
} from "../utils/HelperFunc.jsx";
import Stack from "@mui/material/Stack";
import "../pages.css";
import MapButton from "./MapButton.jsx";
import fetchTramStops from "../api/TramApi.jsx";
import { getTramStopsApiUrl } from "../utils/TramGetFunc.jsx";
import { getBusStopsApiUrl } from "../utils/BusGetFunc.jsx";
import fetchBusStops from "../api/BusApi.jsx";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Map = ({ searchTerm, onMarkerSelect, onMarkersUpdate }) => {
  const [markers, setMarkers] = useState([]);
  const [tramStops, setTramStops] = useState([]);
  const [busStops, setBusStops] = useState([]);
  const [showTramStops, setShowTramStops] = useState(false);
  const [showBusStops, setShowBusStops] = useState(false);

  const API = "https://geoserver.nottinghamcity.gov.uk/parking/defstatus.json";
  useEffect(() => {
    const getMarkers = async () => {
      const data = await fetchData(API);
      setMarkers(data);
      if (onMarkersUpdate) {
        onMarkersUpdate(data);
      }
      console.log("park and ride stops fetched:", data); // Debug
    };

    getMarkers();
  }, [onMarkersUpdate]);

  useEffect(() => {
    if (showTramStops) {
      const getStops = async () => {
        const url = getTramStopsApiUrl(searchTerm);
        if (url) {
          const data = await fetchTramStops(url);
          setTramStops(data);
        } else {
          setTramStops([]);
        }
      };

      getStops();
    } else {
      setTramStops([]);
    }
  }, [searchTerm, showTramStops]);

  useEffect(() => {
    if (showBusStops) {
      const getStops = async () => {
        const url = getBusStopsApiUrl(searchTerm);
        if (url) {
          const data = await fetchBusStops(url);
          setBusStops(data);
          console.log("Bus stops fetched:", data); // Debug
        } else {
          setBusStops([]);
        }
      };

      getStops();
    } else {
      setBusStops([]);
    }
  }, [searchTerm, showBusStops]);

  useEffect(() => {}, [showTramStops, tramStops, showBusStops, busStops]);

  const filteredMarkers = markers.filter((marker) =>
    marker.name.toLowerCase().includes(searchTerm)
  );

  const handleShowTramStops = () => {
    setShowTramStops((prev) => !prev);
  };

  const handleShowBusStops = () => {
    setShowBusStops((prev) => !prev);
    console.log("Bus stops visibility toggled:", !showBusStops);
  };
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

          {filteredMarkers.map(
            ({ id, name, ParkingSpots, status, position }) => (
              <Marker
                Marker
                key={id}
                position={position}
                eventHandlers={{
                  click: () => {
                    onMarkerSelect({ name, status, ParkingSpots });
                  },
                }}
              >
                <Popup>
                  {name}
                  <br /> {ParkingSpots} Parking Spots available
                  <br /> The park is {status}.
                </Popup>
              </Marker>
            )
          )}

          {showTramStops &&
            tramStops.map(({ Id, StopName, position }) => (
              <Marker key={Id} position={position} icon={tramStopIcon}>
                <Popup>{StopName}</Popup>
              </Marker>
            ))}
          {showBusStops &&
            busStops.map(({ Id, StopName, StopCode, position }) => (
              <Marker key={Id} position={position} icon={busStopIcon}>
                <Popup>
                  {StopName}
                  <br /> Stop Code: {StopCode}
                </Popup>
              </Marker>
            ))}

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
            <MapButton text="Bus Stops" onClick={handleShowBusStops} />
            <MapButton text="Tram Stops" onClick={handleShowTramStops} />
          </Stack>
          {}
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
