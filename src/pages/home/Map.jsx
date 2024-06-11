import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import fetchData from "../api/API.jsx";
import L from "leaflet";
import { LocationMarker } from "../utils/HelperFunc.jsx";
import Stack from "@mui/material/Stack";
import "../pages.css";
import MapButton from "./MapButton.jsx";
import fetchTramStops from "../api/TramApi.jsx";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Map = ({ searchTerm }) => {
  const [markers, setMarkers] = useState([]);
  const [tramStops, setTramStops] = useState([]);
  const [showTramStops, setShowTramStops] = useState(false);

  const API = "https://geoserver.nottinghamcity.gov.uk/parking/defstatus.json";
  const HucknallApi =
    "https://services.arcgis.com/yvqphKcf9bBSnjX1/arcgis/rest/services/Tram_Stops/FeatureServer/62/query?where=1%3D1&objectIds=9%2C44%2C8%2C13%2C71%2C14%2C4%2C45%2C16%2C69%2C82%2C26&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Kilometer&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";

  const PhonixAPI =
    "https://services.arcgis.com/yvqphKcf9bBSnjX1/arcgis/rest/services/Tram_Stops/FeatureServer/62/query?where=1%3D1&objectIds=34%2C61%2C83%2C6%2C71%2C4%2C45%2C47%2C14%2C16%2C60%2C57%2C26&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";

  const ForestApi =
    "https://services.arcgis.com/yvqphKcf9bBSnjX1/arcgis/rest/services/Tram_Stops/FeatureServer/62/query?where=1%3D1&objectIds=37%2C60%2C82%2C26&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";

  const QueensApi =
    "https://services.arcgis.com/yvqphKcf9bBSnjX1/arcgis/rest/services/Tram_Stops/FeatureServer/62/query?where=1%3D1&objectIds=28%2C52%2C77%2C10%2C79%2C7%2C26&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";
  const WilkApi =
    "https://services.arcgis.com/yvqphKcf9bBSnjX1/arcgis/rest/services/Tram_Stops/FeatureServer/62/query?where=1%3D1&objectIds=71%2C4%2C45%2C47%2C14%2C16%2C60%2C57%2C26&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";

  const MoorBridge =
    "https://services.arcgis.com/yvqphKcf9bBSnjX1/arcgis/rest/services/Tram_Stops/FeatureServer/62/query?where=1%3D1&objectIds=78%2C44%2C61%2C83%2C6%2C71%2C4%2C45%2C47%2C14%2C16%2C60%2C57%2C26&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";
  useEffect(() => {
    const getMarkers = async () => {
      const data = await fetchData(API);
      setMarkers(data);
      console.log("park and ride stops fetched:", data); // Debug
    };

    getMarkers();
  }, [API]);
  useEffect(() => {
    if (showTramStops) {
      const getStops = async () => {
        let data = [];
        if (searchTerm.toLowerCase().includes("phoenix")) {
          data = await fetchTramStops(PhonixAPI);
        } else if (searchTerm.toLowerCase().includes("hucknall")) {
          data = await fetchTramStops(HucknallApi);
        } else if (searchTerm.toLowerCase().includes("forest")) {
          data = await fetchTramStops(ForestApi);
        } else if (searchTerm.toLowerCase().includes("queens")) {
          data = await fetchTramStops(QueensApi);
        } else if (searchTerm.toLowerCase().includes("wilkinson")) {
          data = await fetchTramStops(WilkApi);
        } else if (searchTerm.toLowerCase().includes("moor bridge")) {
          data = await fetchTramStops(MoorBridge);
        }
        setTramStops(data);
        console.log("Tram stops fetched:", data); // Debug
      };

      getStops();
    }
  }, [searchTerm, showTramStops, PhonixAPI, HucknallApi]);
  const filteredMarkers = markers.filter((marker) =>
    marker.name.toLowerCase().includes(searchTerm)
  );
  const handleShowTramStops = () => {
    setShowTramStops((prev) => !prev);
    console.log("Tram stops visibility toggled:", !showTramStops);
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
              <Marker key={id} position={position}>
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
              <Marker key={Id} position={position}>
                <Popup>{StopName}</Popup>
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
            <MapButton text="Bus Stops" />
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
