import React, { useState, useEffect } from "react";
import { Marker, useMapEvents, Popup } from "react-leaflet";
import { IconButton } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import L from "leaflet";

export function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom(), map.autoPanOnFocus);
    },
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  const handleLocateUser = (e) => {
    e.stopPropagation();
    map.locate();
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTouchStart = () => {
    setIsActive(true);
  };

  const handleTouchEnd = () => {
    setIsActive(false);
  };

  return (
    <>
      {position && (
        <Marker position={position}>
          <Popup>Current Location</Popup>
        </Marker>
      )}
      <IconButton
        onClick={handleLocateUser}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          backgroundColor:
            isActive || isHovered ? "rgb(0, 88, 0)" : "rgb(228, 242, 234)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <NavigationIcon
          style={{ color: isActive || isHovered ? "white" : "black" }}
        />
      </IconButton>
    </>
  );
}

export const tramStopIcon = new L.Icon({
  iconUrl: require("../imgs/TramIcon.png"),
  iconSize: [20, 20],
  iconAnchor: [20, 20],
  popupAnchor: [1, -34],
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  shadowSize: [20, 20],
  shadowAnchor: [20, 20],
});

export const busStopIcon = new L.Icon({
  iconUrl: require("../imgs/bus-stop.png"),
  iconSize: [20, 20],
  iconAnchor: [20, 20],
  popupAnchor: [1, -34],
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  shadowSize: [20, 20],
  shadowAnchor: [20, 20],
});
