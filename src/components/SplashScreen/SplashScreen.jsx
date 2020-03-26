import React from "react";
import StartAppButton from "../StartAppButton/StartAppButton";
import { Frame, AnimatePresence } from "framer";
import { useSelector, useDispatch } from "react-redux";
import useAuth0 from "../../hooks/useAuth0/useAuth0";
import acquireColourArray from "../../hooks/acquireColourArray/acquireColourArray";
import PixelingBackdrop from "../PixelingBackdrop/PixelingBackdrop";
import BackendSeverChecker from "../BackendSeverChecker/BackendSeverChecker";

import "./SplashScreen.scss";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useRouteMatch,
  useParams
} from "react-router-dom";

const SplashScreen = () => {
  useAuth0();
  const startApp = useSelector(state => state.app.startApp);

  const splashScreenVarients = {
    unActive: {
      opacity: 0,
      visable: 0,
      transition: {
        delay: 1.7
      }
    },
    active: {
      visable: 1,
      opacity: 1,
      transition: {
        delay: 0
      }
    },
    exit: {
      visable: 0,
      transition: {
        delay: 2
      }
    }
  };

  return (
    <AnimatePresence>
      {!startApp && (
        <Frame
          id="splash-screen"
          style={{
            backgroundColor: "rgb(19, 19, 19)",
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0
          }}
          initial={"unActive"}
          animate={"active"}
          exit={"exit"}
          variants={splashScreenVarients}
        >
          <PixelingBackdrop exitSignal={startApp} />
          {!startApp && (
            <Frame
              style={{
                fontFamily: "'Maven Pro', sans-serif",
                fontSize: "220px",
                fontWeight: 500,
                color: "rgb(232, 232, 232)",
                height: "220px",
                marginTop: "30px"
              }}
              center="x"
              size={"100%"}
              background={""}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              id="splash-screen-title-container"
            >
              <Frame
                size={"100%"}
                background={""}
                style={{
                  fontFamily: "'Maven Pro', sans-serif",
                  fontSize: "220px",
                  fontWeight: 500,
                  color: "rgb(232, 232, 232)",
                  height: "220px",
                  marginTop: "30px"
                }}
                center="x"
                initial={{ textShadow: "0 0 12px rgba(250, 250, 250, 0.300)" }}
                animate={{ textShadow: "0 0 20px rgba(250, 250, 250, 0.45)" }}
                transition={{ ease: "easeInOut", duration: 2, yoyo: Infinity }}
                id="splash-screen-title"
              >
                AI Wars
              </Frame>
              <Frame
                size={"100%"}
                background={""}
                style={{
                  fontFamily: "'Maven Pro', sans-serif",
                  fontSize: "220px",
                  fontWeight: 500,
                  color: "rgb(232, 232, 232)",
                  height: "220px",
                  marginTop: "30px",
                  textShadow: "rgba(255, 255, 255, 0.5) 0px 2px 3px"
                }}
                center="x"
                exit={{ opacity: 0 }}
                id="splash-screen-title-inner-shadow"
              >
                AI Wars
              </Frame>
            </Frame>
          )}
          <StartAppButton />
          <BackendSeverChecker />
          {/* <nav>
              <Link to={"/how-to-use"}>How to use</Link>
            </nav> */}
        </Frame>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
