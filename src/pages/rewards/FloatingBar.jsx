import React from "react";
import styled from "styled-components";
import greenStats from "../imgs/greenStats.png";
import leaderboard from "../imgs/leaderboard.png";
import whiteRose from "../imgs/whiteRose.png";
import Coffee from "../imgs/200Coffee.png";
import city from "../imgs/city.png";

const FloatingContainer = styled.div`
  position: fixed;
  bottom: 2em;
  left: 0;
  height: 2em;
  width: 100%;
  line-height: 2em;
  color: #fff;
`;

const FloatingLabel = styled.label`
  width: 160%;
  height: 4em;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  border: 8px solid black;
`;

const FloatingList = styled.ul`
  position: absolute;
  left: 0;
  width: 100%;
  transition: bottom 0.1s ease-in;
  list-style: none;
  margin: 0;
  padding: 0;
  background: darkgreen;
`;

const FloatingListItem = styled.li`
  height: auto;
  background: white;
  color: darkgreen;
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.5em 0;
  padding: 0.5em;
  text-align: center;

  h3,
  p {
    margin: 0;
  }

  p {
    color: black;
    font-size: 0.7em;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: flex-end; /* Align items to the bottom */
  justify-content: center;
  height: 100%; /* Ensure the container takes full height of FloatingListItem */
`;

const Image = styled.img`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
`;

const FloatingInput = styled.input`
  &[type="checkbox"]:checked + ul {
    bottom: 2em;
  }
`;

const FloatingBar = () => {
  return (
    <FloatingContainer id="floating">
      <FloatingLabel htmlFor="toggle">Floating bar here</FloatingLabel>
      <FloatingInput type="checkbox" id="toggle" hidden />
      <FloatingList>
        <FloatingListItem>
          <h3>Leaderboard</h3>
          <p>Challenge your mates!</p>
          <ImageContainer>
            <Image
              src={leaderboard}
              alt="Leaderboard"
              width="10vh"
              height="auto"
            />
            <Image src={city} alt="City" width="10vh" height="auto" />
          </ImageContainer>
        </FloatingListItem>
        <FloatingListItem>
          <h3>Greenstats</h3>
          <p>Track your progress!</p>
          <Image
            src={greenStats}
            alt="Green Stats"
            width="10vh"
            height="auto"
          />
        </FloatingListItem>
        <FloatingListItem>
          <h3>Rewards & Offers</h3>
          <p>See what you can unlock!</p>
          <ImageContainer>
            <Image
              src={whiteRose}
              alt="White Rose"
              width="10vh"
              height="auto"
            />
            <Image src={Coffee} alt="Coffee" width="10vh" height="auto" />
          </ImageContainer>
        </FloatingListItem>
      </FloatingList>
    </FloatingContainer>
  );
};

export default FloatingBar;
