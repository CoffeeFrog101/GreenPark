import React, { useState } from "react";
import Map from "./Map";
//import BottomNavBar from "./BottomNavBar";
import Container from "@mui/material/Container";
import SearchBar from "./SearchBar";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  return (
    <div className="page-content">
      <Container maxWidth="sm" className="top-panel">
        <h3> Hello, User!</h3>
        <h5> You've saved X carbon footprint. Keep up the good work!</h5>
        <div className="text-fields">
          <SearchBar onSearchChange={handleSearchChange} /> {}
        </div>
      </Container>
      <Map searchTerm={searchTerm} />
    </div>
  );
};
// putting it underneath map here doesn't work
//      <BottomNavBar />

export default Home;
