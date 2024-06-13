import React from "react";
import Container from "@mui/material/Container";
import plantHand from "../imgs/plantHand.png";
import GreenPoints from "./greenPoints";

const RewardsInfo = ({ floatingBarActive }) => {
  const rewardsContainer = {
    backgroundColor: "rgb(0, 88, 0)",
    color: "white",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "50px",
    padding: "12px",
    marginTop: "50px",
    marginBottom: "50px",
    border: "4px solid black",
  };

  return (
    <GreenPoints
      imageSrc={plantHand}
      altText="Rewards picture"
      description="Earn 1 point for every 1 kg of CO2 saved! Accumulated points can be redeemed for rewards such as free coffee, discounts, gift cards, and more."
    />
  );
};

export default RewardsInfo;
