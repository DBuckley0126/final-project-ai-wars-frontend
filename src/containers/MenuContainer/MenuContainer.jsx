import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameInstancesContainer from "../GameInstancesContainer/GameInstancesContainer";
import { initActionCable } from "./MenuContainerActions";
import { Frame, AnimatePresence, useAnimation } from "framer";

import GameLobby from "../../components/GameLobby/GameLobby";
import GeneralButton from "../../components/GeneralButton/GeneralButton";

import "./MenuContainer.scss";
import PixelingBackdrop from "../../components/PixelingBackdrop/PixelingBackdrop";

const MenuContainer = () => {
  const dispatch = useDispatch();
  const apiToken = useSelector(state => state.auth0.apiToken);
  const cable = useSelector(state => state.gameInstancesOverseer.cable);
  const startGame = useSelector(state => state.app.startGame);
  const showLobby = useSelector(state => state.app.showLobby);
  const clientHeight = document.documentElement.clientHeight;
  const clientWidth = document.documentElement.clientWidth;

  const controls = useAnimation();

  useEffect(() => {
    dispatch(initActionCable({ apiToken, dispatch }));
  }, [apiToken, dispatch]);

  const subscriptionActive = useSelector(
    state => state.gameOverseer.subscriptionActive
  );

  const renderGameInstances = () => {
    if (cable) {
      return <GameInstancesContainer />;
    }
  };

  const menuContainerVariants = {
    unActive: {
      opacity: 0
    },
    active: {
      opacity: 1,
      transition: {
        delay: 1.3
      }
    },
    exitStartGame: {
      opacity: 0,
      visable: 0,
      transition: {
        delay: 1.5,
        visable: {
          delay: 4.2
        },
        opacity: {
          delay: 4.2,
          duration: 0.5
        }
      }
    }
  };

  const controlAnimation = () => {
    if (subscriptionActive && showLobby && startGame) {
      controls.start("exitStartGame");
    } else if (subscriptionActive && showLobby) {
      controls.start("active");
    }
  };

  const lobbyContainerVariants = {
    unActive: {
      visable: 0,
      delay: 0
    },
    active: {
      visable: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exitNormal: {
      visable: 0,
      transition: {
        from: 1,
        delay: 1.5
      }
    },
    exitStartGame: {
      width: ["800px", "800px", "800px", clientWidth],
      height: ["800px", clientHeight, clientHeight, clientHeight],
      opacity: 0,
      visable: 0,
      transition: {
        delay: 1.5,
        visable: {
          delay: 4.2
        },
        opacity: {
          delay: 4.2,
          duration: 0.5
        },
        duration: 2,
        ease: "easeInOut",
        type: "tween"
      }
    }
  };
  controlAnimation();

  return (
    <AnimatePresence>
      {!startGame && (
        <Frame
          className="menu-container"
          initial={"unActive"}
          animate={"active"}
          width="100%"
          height="100%"
          exit="exitStartGame"
          style={{
            backgroundColor: "rgb(19, 19, 19)",
            position: "fixed",
            top: 0,
            left: 0
          }}
          variants={menuContainerVariants}
        >
          <PixelingBackdrop exitSignal={startGame} />
          {renderGameInstances()}
          <AnimatePresence>
            {subscriptionActive && showLobby && (
              <Frame
                id="lobby-container"
                key="lobby-container"
                style={{
                  width: "800px",
                  height: "800px",
                  position: "absolute",
                  backgroundColor: ""
                }}
                visable={1}
                animate={controls}
                exit={"exitNormal"}
                variants={lobbyContainerVariants}
                center
              >
                <GameLobby />
              </Frame>
            )}
          </AnimatePresence>
          <GeneralButton />
        </Frame>
      )}
    </AnimatePresence>
  );
};

export default MenuContainer;
