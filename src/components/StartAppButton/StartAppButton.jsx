import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { startApp } from "./startAppButtonActions";
import acquireColourArray from "../../hooks/acquireColourArray/acquireColourArray";

import { Frame, AnimatePresence } from "framer";

import "./StartAppButton.scss";

const StartAppButton = () => {
  const dispatch = useDispatch();
  const userSynced = useSelector(state => state.auth0.synced);
  const user = useSelector(state => state.auth0.user);
  const loginWithRedirect = useSelector(state => state.auth0.loginWithRedirect);
  const logout = useSelector(state => state.auth0.logout);
  const startAppSignal = useSelector(state => state.app.startApp);
  const backendSeverActive = useSelector(state => state.app.backendSeverActive);

  // nickname for non google user
  // given_name for google user

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
    const colour = acquireColourArray();
    return {
      scale: 1.05,
      shadow: colour.shadow,
      backgroundColor: colour.colour
    };
  };

  const mainButtonVariants = {
    unActive: {
      shadow: "0 0 0px 0px rgba(250, 250, 250, 0.300)",
      opacity: 0
    },
    active: {
      shadow: "0 0 20px 1px rgba(250, 250, 250, 0.300)",
      opacity: 1,
      transition: {
        default: { duration: 1, ease: "easeOut" },
        scale: { duration: 0.2, type: "spring", stiffness: 200 },
        backgroundColor: { duration: 0.4, ease: "easeOut" },
        delay: 0.4
      }
    },
    exit: {
      shadow: "0 0 0px 0px rgba(250, 250, 250, 0.300)",
      opcaity: 0,
      transition: {
        default: { duration: 1, ease: "easeOut" },
        scale: { duration: 0.2 },
        backgroundColor: { duration: 0.4, ease: "easeOut" },
        delay: 1
      }
    }
  };

  const logoutButtonVariants = {
    unActive: {
      width: 0,
      x: -120,
      y: 0,
      shadow: "0 0 0px 0px rgba(250, 250, 250, 0.300)",
      transition: {
        default: { duration: 1, ease: "easeOut" },
        scale: { duration: 0.2, type: "spring", stiffness: 200 },
        backgroundColor: { duration: 0.4, ease: "easeOut" },
        delay: 0.2
      }
    },
    active: {
      width: 200,
      x: -220,
      y: 0,
      shadow: "0 0 20px 1px rgba(250, 250, 250, 0.300)",
      transition: {
        default: { duration: 1, ease: "easeOut" },
        scale: { duration: 0.2, type: "spring", stiffness: 200 },
        backgroundColor: { duration: 0.4, ease: "easeOut" },
        delay: 0.8,
        delayChildren: 1.2
      }
    }
  };

  const logoutButtonItemVariants = {
    unActive: {
      opacity: 0
    },
    active: {
      opacity: 1
    }
  };

  const accountInfoVariants = {
    unActive: {
      width: 0,
      x: 120,
      y: 0,
      shadow: "0 0 0px 0px rgba(250, 250, 250, 0.300)",
      transition: {
        default: { duration: 1, ease: "easeOut" },
        scale: { duration: 0.2, type: "spring", stiffness: 200 },
        backgroundColor: { duration: 0.4, ease: "easeOut" },
        delay: 0.2
      }
    },
    active: {
      width: 200,
      x: 220,
      y: 0,
      shadow: "0 0 20px 1px rgba(250, 250, 250, 0.300)",
      transition: {
        default: { duration: 1, ease: "easeOut" },
        scale: { duration: 0.2, type: "spring", stiffness: 200 },
        backgroundColor: { duration: 0.4, ease: "easeOut" },
        delay: 0.8,
        delayChildren: 1.2
      }
    }
  };

  const accountInfoChildrenVariants = {
    unActive: {
      opacity: 0
    },
    active: {
      opacity: 1
    }
  };

  return (
    <AnimatePresence>
      {backendSeverActive && (
        <AnimatePresence>
          <Frame
        onClick={() => handleMainButtonClick()}
        id="splash-screen-main-button"
        initial={"unActive"}
        whileHover={() => hoverStyle()}
        animate={"active"}
        style={{
          backgroundColor: "rgb(232, 232, 232)",
          cursor: "pointer"
        }}
        variants={mainButtonVariants}
        center
      >
        {userSynced ? "Start" : "Login"}
      </Frame>
      {user && !startAppSignal && (
        <Frame
          id="splash-screen-logout-button"
          key="splash-screen-logout-button"
          onClick={() => logout({ returnTo: window.location.origin })}
          center
          initial={"unActive"}
          whileHover={() => hoverStyle()}
          animate={"active"}
          exit={"unActive"}
          style={{
            backgroundColor: "rgb(232, 232, 232)",
            cursor: "pointer"
          }}
          variants={logoutButtonVariants}
        >
          <Frame
            background=""
            center
            transition={{ duration: 0.2 }}
            variants={logoutButtonItemVariants}
          >
            Logout
          </Frame>
        </Frame>
      )}
      {userSynced && !startAppSignal && (
        <Frame
          id="splash-screen-account-info"
          key="splash-screen-account-info"
          initial={"unActive"}
          whileHover={() => hoverStyle()}
          animate={"active"}
          exit={"unActive"}
          center
          style={{
            backgroundColor: "rgb(232, 232, 232)"
          }}
          variants={accountInfoVariants}
        >
          <Frame
            id="splash-screen-account-info-details"
            key="splash-screen-account-info-details"
            background=""
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              alignItems: "center",
              flexDirection: "column"
            }}
            transition={{ duration: 0.2 }}
            variants={accountInfoChildrenVariants}
          >
            {generateAccountInfo()}
          </Frame>
        </Frame>
      )}
        </AnimatePresence>
      )}
      
    </AnimatePresence>
  );
};

export default StartAppButton;
