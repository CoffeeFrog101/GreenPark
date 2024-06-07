import React, { useState } from "react";
import Map from "./Map";
import TopPanel, { topPanelStyle, headingStyle } from "./TopPanel";
import ParkingStats from "./ParkingStats";
import styled from "styled-components";
import SearchBar from "./SearchBar";

const StyledContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 5px
  background-color: white;

`;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (term) => {
    setSearchTerm(term.toLowerCase());
  };
  return (
    <div className="page-content">
      <TopPanel panel={topPanelStyle} head={headingStyle}>
        <SearchBar onSearchChange={handleSearchChange} />
      </TopPanel>
      <StyledContainer>
        <Map searchTerm={searchTerm} />
      </StyledContainer>
      <ParkingStats />
    </div>
  );
};

export default Home;
