import React, { useState } from "react";
import Map from "./Map";
import { TopPanel, topPanelStyle, headingStyle } from "./TopPanel";
import ParkingStats from "./ParkingStats";
import styled from "styled-components";
import CustomTextField from "./SearchBar";

const StyledContainer = styled.div`
  margin-top: 10px;

  margin-bottom: 10px;

  background-color: white;
`;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);

  const handleSearchClick = (term) => {
    setSearchTerm(term.toLowerCase());
  };
  const handleMarkerSelect = (marker) => {
    setSelectedMarker(marker);
  };

  const handleMarkersUpdate = (markers) => {
    setMarkers(markers);
  };

  return (
    <div className="page-content">
      <TopPanel
        panel={topPanelStyle}
        head={headingStyle}
        onSearchClick={handleSearchClick}
      >
        <CustomTextField onSearchChange={handleSearchClick} />
      </TopPanel>
      <StyledContainer>
        <Map
          searchTerm={searchTerm}
          onMarkerSelect={handleMarkerSelect}
          onMarkersUpdate={handleMarkersUpdate}
        />
      </StyledContainer>

      <ParkingStats markers={markers} searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
