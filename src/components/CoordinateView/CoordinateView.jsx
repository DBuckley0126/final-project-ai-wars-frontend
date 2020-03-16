import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CoordinateView.scss";
import { Frame, AnimatePresence, useAnimation } from "framer";
import useLocalUserType from "../../hooks/useLocalUserType/useLocalUserType";

const CoordinateView = () => {
  const coordinates = useSelector(
    state => state.gameOverseer.currentHighlightedCoordinate
  );

  const localUserType = useLocalUserType();

  const coordinateViewVariants = {
    unActive: {
      opacity: 0
    },
    active: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        delay: 7
      }
    }
  };

  const generateContent = () => {
    if (coordinates.X || coordinates.Y) {
      return `X: ${coordinates.X}\nY: ${coordinates.Y}`;
    } else {
      return ``;
    }
  };

  return (
    <Frame
      id="coordinate-view"
      initial="unActive"
      animate="active"
      variants={coordinateViewVariants}
      style={{
        backgroundColor: "",
        width: "120px",
        height: "200px",
        y: "5%",
        color: "rgb(232, 232, 232)",
        fontFamily: "Maven Pro",
        fontSize: "36px",
        fontWeight: "500",
        left: localUserType === "host_user" ? "30%" : "",
        right: localUserType === "join_user" ? "30%" : ""
      }}
      center="y"
    >
      {generateContent()}
    </Frame>
  );
};

export default CoordinateView;
