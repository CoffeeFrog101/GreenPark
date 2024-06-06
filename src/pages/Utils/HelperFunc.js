import { useState, useEffect } from "react";
import { Marker, useMapEvents, Popup } from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export function Animate() {
  const map = useMapEvents({
    click: (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true,
      });
    },
  });
  return null;
}

export function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom(), map.getZoom, map.getZoom);
    },
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  const handleLocateUser = (e) => {
    e.stopPropagation();
    map.locate();
  };

  return (
    <>
      {position && (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      )}
      <button
        onClick={handleLocateUser}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          backgroundColor: "Green",
          color: "white",
          border: "none",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        Locate
      </button>
    </>
  );
}

// export function Locator() {
//   const map = useMapEvents();

//   const handleLocateUser = () => {
//     map.locate();
//   };

//   return (
// <button
//   onClick={handleLocateUser}
//   style={{
//     position: "absolute",
//     bottom: "20px",
//     right: "20px",
//     width: "50px",
//     height: "50px",
//     borderRadius: "50%",
//     backgroundColor: "blue",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//     zIndex: 1000,
//   }}
// >
//   Locate
// </button>
//);
// }
