import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Frame, AnimatePresence, useAnimation } from "framer";

const BackendSeverChecker = () => {
  const backendSeverActive = useSelector(state => state.app.backendSeverActive);

  const coordinateViewVariants = {
    unActive: {
      opacity: 0
    },
    active: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        delay: 0
      }
    }
  };
  
  return (
    <AnimatePresence>
      {!backendSeverActive && (
        <Frame
          id="backend-sever-checker"
          initial="unActive"
          animate="active"
          exit="unActive"
          variants={coordinateViewVariants}
          style={{
            backgroundColor: "",
            width: "400px",
            height: "100px",
            color: "rgb(232, 232, 232)",
            fontFamily: "Maven Pro",
            fontSize: "26px",
            fontWeight: "500"
          }}
          center
        >
          Waiting For Backend Sever
        </Frame>
      )}
    </AnimatePresence>
  );
};

export default BackendSeverChecker;
