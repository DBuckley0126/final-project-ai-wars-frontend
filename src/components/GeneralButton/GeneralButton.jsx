import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./GeneralButton.scss";

import {
  exitLobby,
  initGameOverseerSubscription
} from "./GeneralButtonActions";
import { AnimatePresence, Frame } from "framer";

const GeneralButton = () => {
  const gameSubscriptionActive = useSelector(
    state => state.gameOverseer.subscriptionActive
  );

  const colourArray = () => {
    const array = [
      {
        colour: "rgba(0,255,232, 1)",
        shadow: "0 0 20px 1px rgba(0,255,232, 0.300)"
      },
      {
        colour: "rgba(255,0,248, 1)",
        shadow: "0 0 20px 1px rgba(255,0,248, 0.300)"
      },
      {
        colour: "rgba(184,2,249, 1)",
        shadow: "0 0 20px 1px rgba(184,2,249, 0.300)"
      },
      {
        colour: "rgba(47,251,1, 1)",
        shadow: "0 0 20px 1px rgba(47,251,1, 0.300)"
      },
      {
        colour: "rgba(251,126,0, 1)",
        shadow: "0 0 20px 1px rgba(251,126,0, 0.300)"
      },
      {
        colour: "rgba(0,30,255, 1)",
        shadow: "0 0 20px 1px rgba(0,30,255, 0.300)"
      },
      {
        colour: "rgba(235,255,0, 1)",
        shadow: "0 0 20px 1px rgba(235,255,0, 0.300)"
      },
      {
        colour: "rgba(255,0,0, 1)",
        shadow: "0 0 20px 1px rgba(255,0,0, 0.300)"
      }
    ];
    return array[Math.floor(Math.random() * array.length)];
  };

  const handleClick = () => {
    if (gameSubscriptionActive) {
      dispatch(exitLobby());
    } else {
      dispatch(
        initGameOverseerSubscription({
          requestType: "CREATE_LOBBY"
        })
      );
    }
  };

  const dispatch = useDispatch();

  const hoverStyle = () => {
    const colour = colourArray();
    return {
      scale: 1.05,
      shadow: colour.shadow,
      backgroundColor: colour.colour
    };
  };

  const generalButtonVariants = {
    unActive: {
      opacity: 0,
      shadow: "0 0 0px 0px rgba(250, 250, 250, 0.300)",
      transition: {
        default: { duration: 1, ease: "easeOut" },
        scale: { duration: 0.2 },
        opacity: { duration: 1, ease: "easeOut", delay: 1 },
        backgroundColor: { duration: 0.4, ease: "easeOut" }
      }
    },
    active: {
      opacity: 1,
      shadow: "0 0 20px 1px rgba(250, 250, 250, 0.300)",
      transition: {
        default: { duration: 1, ease: "easeOut" },
        scale: { duration: 0.2, type: "spring", stiffness: 200 },
        opacity: { duration: 1, ease: "easeOut", delay: 2.5 },
        shadow: { duration: 1, ease: "easeOut", delay: 3 },
        backgroundColor: { duration: 0.4, ease: "easeOut" }
      }
    }
  };

  const generalButtonContentsVariants = {
    unActive: {
      transition: {
        default: { duration: 1, ease: "easeOut" },
        scale: { duration: 0.2 },
        backgroundColor: { duration: 0.4, ease: "easeOut" }
      }
    },
    active: {
      transition: {
        default: { duration: 1, ease: "easeOut" },
        scale: { duration: 0.2 },
        backgroundColor: { duration: 0.4, ease: "easeOut" }
      }
    }
  };

  return (
    <AnimatePresence>
      <Frame
        id="general-button"
        key="general-button"
        onClick={() => handleClick()}
        initial={"unActive"}
        whileHover={() => hoverStyle()}
        animate={"active"}
        style={{
          backgroundColor: "rgba(232, 232, 232, 1)",
          width: "130px",
          height: "130px",
          position: "absolute",
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "baseline",
          alignContent: "center"
        }}
        center
        x="-500px"
        y="-500px"
        variants={generalButtonVariants}
      >
        <Frame
          id="general-button-contents"
          style={{
            fontSize: "100px",
            width: "130px",
            height: "130px",
            backgroundColor: "rgba(0, 0, 0, 0)",
            color: "rgba(0, 0, 0, 1)",
            textAlign: "center",
            alignItems: "none"
          }}
          initial={"unActive"}
          animate={"active"}
          center
          variants={generalButtonContentsVariants}
        >
          +
        </Frame>
      </Frame>
    </AnimatePresence>
  );
};

export default GeneralButton;
