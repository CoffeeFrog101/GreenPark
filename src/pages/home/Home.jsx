import React from "react";
import Map from "./Map";
import TopPanel from "./TopPanel";
import ParkingStats from "./ParkingStats";
import styled from "styled-components";

const StyledContainer = styled.div`
  margin-top: 10px; 
  margin-bottom: 5px;
`;

const Home = () => {
  return (
    <div className="page-content">
      <TopPanel />
      <StyledContainer>
        <Map />
      </StyledContainer>
      <ParkingStats />
    </div>
  );
};

export default Home;
