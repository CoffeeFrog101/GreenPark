import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { marker } from "leaflet";

const Map = () => {
  const position = [52.95435, -1.14956];
  const carPark1 = {
    name: "carpark1",
    capacity: 88,
    position: [52.95435, -1.14956],
  };
  const markers = [carPark1];

  return (
    <div style={{ display: "flex", justifyContent: "center", widith: "100%" }}>
      <MapContainer
        style={{ height: "60vh", width: "80vw", maxWidth: "100%" }}
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map(({ name, capacity, position }) => (
          <Marker position={position}>
            <Popup>{name + " " + capacity}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
