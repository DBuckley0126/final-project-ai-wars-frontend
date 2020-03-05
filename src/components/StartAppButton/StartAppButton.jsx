import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { startApp } from "./startAppButtonActions";

import { motion } from "framer-motion";
import { Frame, AnimatePresence } from "framer";

import "./StartAppButton.scss";

const StartAppButton = () => {
  const dispatch = useDispatch();
  const userSynced = useSelector(state => state.auth0.synced);
  const user = useSelector(state => state.auth0.user);
  const loginWithRedirect = useSelector(state => state.auth0.loginWithRedirect);
  const logout = useSelector(state => state.auth0.logout);

  // nickname for non google user
  // given_name for google user

  const colourArray = () => {
    const array = [
      {colour: "rgba(0,255,232, 1)", shadow: "0 0 20px 1px rgba(0,255,232, 0.300)"},
      {colour: "rgba(255,0,248, 1)", shadow: "0 0 20px 1px rgba(255,0,248, 0.300)"},
      {colour: "rgba(184,2,249, 1)", shadow: "0 0 20px 1px rgba(184,2,249, 0.300)"},
      {colour: "rgba(47,251,1, 1)", shadow: "0 0 20px 1px rgba(47,251,1, 0.300)"},
      {colour: "rgba(251,126,0, 1)", shadow: "0 0 20px 1px rgba(251,126,0, 0.300)"},
      {colour: "rgba(0,30,255, 1)", shadow: "0 0 20px 1px rgba(0,30,255, 0.300)"},
      {colour: "rgba(235,255,0, 1)", shadow: "0 0 20px 1px rgba(235,255,0, 0.300)"},
      {colour: "rgba(255,0,0, 1)", shadow: "0 0 20px 1px rgba(255,0,0, 0.300)"}
    ];
    return array[Math.floor(Math.random() * array.length)];
  };

  const generateAccountInfo = () => {
    if (user.given_name) {
      return (
        <>
          <img
            id="splash-screen-account-info-picture"
            src={user.picture}
            alt="User Profile"
          ></img>
          <p id="splash-screen-account-info-name">{user.given_name}</p>
        </>
      );
    } else {
      return (
        <>
          <img
            id="splash-screen-account-info-picture"
            src={user.picture}
            alt="User Profile"
          ></img>
          <p id="splash-screen-account-info-name">{user.nickname}</p>
        </>
      );
    }
  };

  const handleMainButtonClick = () => {
    if (userSynced) {
      dispatch(startApp());
    } else {
      loginWithRedirect();
    }
  };

  const hoverStyle = () => {
    const colour = colourArray();
    return {
      scale: 1.01,
      shadow: colour.shadow,
      backgroundColor: colour.colour
    };
  };

  return (
    <>
      <Frame
        onClick={() => handleMainButtonClick()}
        id="splash-screen-main-button"
        transition={{
          ease: "easeIn",
          duration: 1,
          delay: 0.5
        }}
        initial={{
          shadow: "0 0 0px 0px rgba(250, 250, 250, 0.300)"
        }}
        whileHover={()=>hoverStyle()}
        animate={{
          shadow: "0 0 20px 1px rgba(250, 250, 250, 0.300)"
        }}
        style={{
          backgroundColor: "rgb(232, 232, 232)"
        }}
        transition={{
          default: { duration: 1, ease: "easeOut" },
          scale: { duration: 0.2 },
          backgroundColor: { duration: 0.4, ease: "easeOut" }
        }}
        center
      >
        {userSynced ? "Start" : "Login"}
      </Frame>
      <AnimatePresence>
        {user && (
          <Frame
            id="splash-screen-logout-button"
            key="splash-screen-logout-button"
            onClick={() => logout({ returnTo: window.location.origin })}
            center
            initial={{
              width: 0,
              x: -120,
              y: 0,
              shadow: "0 0 0px 0px rgba(250, 250, 250, 0.300)"
            }}
            whileHover={()=>hoverStyle()}
            animate={{
              width: 200,
              x: -220,
              y: 0,
              shadow: "0 0 20px 1px rgba(250, 250, 250, 0.300)"
            }}
            style={{
              backgroundColor: "rgb(232, 232, 232)"
            }}
            transition={{
              default: { duration: 1, ease: "easeOut" },
              scale: { duration: 0.2 },
              backgroundColor: { duration: 0.4, ease: "easeOut" }
            }}
          >
            <Frame
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1
              }}
              background=""
              center
              transition={{ duration: 0.2, delay: 0.8 }}
            >
              Logout
            </Frame>
          </Frame>
        )}
        {userSynced && (
          <Frame
            id="splash-screen-account-info"
            key="splash-screen-account-info"
            initial={{
              width: 0,
              x: 120,
              y: 0,
              shadow: "0 0 0px 0px rgba(250, 250, 250, 0.300)"
            }}
            whileHover={()=>hoverStyle()}
            animate={{
              width: 200,
              x: 220,
              y: 0,
              shadow: "0 0 20px 1px rgba(250, 250, 250, 0.300)"
            }}
            center
            style={{
              backgroundColor: "rgb(232, 232, 232)"
            }}
            transition={{
              default: { duration: 1, ease: "easeOut" },
              scale: { duration: 0.2 },
              backgroundColor: { duration: 0.4, ease: "easeOut" }
            }}
          >
            <Frame
              id="splash-screen-account-info-details"
              key="splash-screen-account-info-details"
              background=""
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1
              }}
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                alignItems: "center",
                flexDirection: "column"
              }}
              transition={{ duration: 0.2, delay: 0.8 }}
            >
              {generateAccountInfo()}
            </Frame>
          </Frame>
        )}
      </AnimatePresence>
    </>
    // generate_button()
  );
};

export default StartAppButton;
