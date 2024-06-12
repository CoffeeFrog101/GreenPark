import React from "react";
import "../pages.css";
import profile from "../imgs/profileicon.png";
import SearchBar2 from "./SearchBar2";
import ButtonGrid from "./GridBtns";
import profilePeople from "../imgs/profilePeople.png";

const Profile = () => {
  return (
    <div className="page-content">
      <img
        src={profile}
        alt="Profile pic"
        style={{
          width: "20vh",
          height: "20vh",
          marginTop: "50px",
          marginBottom: "20px",
        }}
      />
      <img
        src={profilePeople}
        alt="Profile People"
        style={{
          width: "30vh",
          height: "25vh",
        }}
      />
      <SearchBar2></SearchBar2>
      <div style={{ marginTop: "50px" }}>
        {" "}
        {}
        <ButtonGrid />
      </div>
    </div>
  );
};

export default Profile;
