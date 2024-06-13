import React from "react";
import "../pages.css";
import SearchBar2 from "./SearchBar2";
import ButtonGrid from "./GridBtns";
import profilePeople from "../imgs/profilePeople.png";
import TopContainer from "./topContainer";

const Profile = () => {
  return (
    <div className="page-content">
      <TopContainer>
      </TopContainer>
      <img
        src={profilePeople}
        alt="Profile People"
        style={{
          width: "30vh",
          height: "25vh",
        }}
      />
      <SearchBar2 />
      <div style={{ marginTop: "50px" }}>
        <ButtonGrid />
      </div>
    </div>
  );
};

export default Profile;
