import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import "./GameGrid.scss";
import GridElement from "../GridElement/GridElement";
import { Frame, AnimatePresence, useAnimation } from "framer";
import useLocalUserType from "../../hooks/useLocalUserType/useLocalUserType";

const GameGrid = () => {
  console.log("Game Grid rendered");

  const mapState = useSelector(state => state.gameOverseer.mapState);
  const [okay, setOkay] = useState(false);

  const localUserType = useLocalUserType();

  const generateGrid = () => {
    return mapState.map((coordinatesSet, index) => (
      <GridElement
        key={coordinatesSet.xy}
        coordinates={coordinatesSet.xy}
        contents={coordinatesSet.c}
        effect={coordinatesSet.e}
        index={index}
        okay={okay}
      />
    ));
  };

  return (
    <Frame
      id="game-grid"
      // onPointerDown={() => {
      //   setOkay(true);
      // }}
      // onPointerUp={() => {
      //   setOkay(false);
      // }}
      style={{
        backgroundColor: "#b15bb100",
        display: "grid",
        gridTemplateRows: "repeat(25, 1fr)",
        gridAutoFlow: "column",
        gridGap: "0.15vh",
        width: "45vw",
        height: "45vw",
        y: "5%",
        left: localUserType === "host_user" ? "60%" : "40%"
      }}
      // initial={"unActive"}
      // animate={"active"}
      // exit={"unActive"}
      rotate={-90}
      center
    >
      {generateGrid()}
    </Frame>
  );
};

export default GameGrid;
