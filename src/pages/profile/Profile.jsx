import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "../pages.css";
import profile from "../imgs/profileicon.png";
import SearchBar2 from "./SearchBar2";

const Profile = () => {
  return (
    <div className="page-content">
      <img
        src={profile}
        alt="Profile pic"
        style={{
          width: "20vh",
          height: "20vh",
          marginTop: "200px",
          marginBottom: "59px",
        }}
      />
      <SearchBar2></SearchBar2>
      <Stack spacing={10}>
        <Button variant="contained" className="profile-buttons">
          Settings
        </Button>
        <Button variant="contained" className="profile-buttons">
          Registration Number
        </Button>
        <Button variant="contained" className="profile-buttons">
          Logout
        </Button>
      </Stack>
    </div>
  );
};

export default Profile;
