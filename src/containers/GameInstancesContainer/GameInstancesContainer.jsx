import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameInstance from "../../components/GameInstance/GameInstance";
import "./GameInstancesContainer.scss";
import useAutoScroll from "../../hooks/useAutoScroll/useAutoScroll";
import { initGameInstancesOverseerSubscription } from "./GameInstancesContainerActions";
import { Frame, Scroll, AnimatePresence } from "framer";

const GameInstancesContainer = () => {
  const dispatch = useDispatch();

  const cable = useSelector(state => state.gameInstancesOverseer.cable);
  const userSynced = useSelector(state => state.auth0.synced);
  const showLobby = useSelector(state => state.app.showLobby);

  useEffect(() => {
    dispatch(initGameInstancesOverseerSubscription(userSynced));
  }, [dispatch, userSynced]);

  const [scrollComponentRef] = useAutoScroll();

  const gameInstances = useSelector(
    state => state.gameInstancesOverseer.gameInstances
  );

  const renderGameInstances = () =>
    gameInstances.map(gameInstance => (
      <GameInstance key={gameInstance.id} gameInstance={gameInstance} />
    ));

  const gameInstancesContainerVariants = {
    unActive: {
      scale: 0.25,
      shadow: "0 0 0px 0px rgba(250, 250, 250, 0.300)",
      transition: {
        default: { duration: 1, ease: "easeOut" },
        scale: { duration: 1, type: "spring", delay: 1.7, stiffness: 120 },
        shadow: { duration: 1, ease: "easeOut", delay: 2 }
      }
    },
    active: {
      scale: 1,
      shadow: "0 0 20px 1px rgba(250, 250, 250, 0.300)",
      transition: {
        default: { duration: 1, ease: "easeOut" },
        scale: { duration: 1, type: "spring", delay: 1.7, stiffness: 120 },
        shadow: { duration: 1, ease: "easeOut", delay: 2 }
      }
    }
  };

  const gameInstancesChildContainerVariants = {
    unActive: {
      opacity: 0,
      visable: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    active: {
      opacity: 1,
      visable: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 2
      }
    },
    exit: {
      opacity: 0,
      visable: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        visable: { delay: 0.5 }
      }
    }
  };

  return (
    <AnimatePresence>
      <Frame
        ref={scrollComponentRef}
        className={"game-instances-container"}
        style={{
          backgroundColor: "rgb(232, 232, 232)",
          display: "flex",
          position: "absolute",
          flexWrap: "nowrap",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "baseline",
          alignContent: "center",
          overflowY: "hidden"
        }}
        width="800px"
        height="800px"
        initial="unActive"
        animate="active"
        variants={gameInstancesContainerVariants}
        center
      >
        <Frame
          style={{
            display: "flex",
            backgroundColor: "rgba(214, 214, 214, 0)",
            position: "relative",
            width: "700px",
            height: "40px",
            flexWrap: "nowrap",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center"
          }}
          center="x"
        ></Frame>
        <AnimatePresence>
          {!showLobby && (
            <Frame
              id="game-instances-child-container"
              style={{
                display: "flex",
                backgroundColor: "rgba(214, 214, 214, 0)",
                position: "relative",
                width: "700px",
                flexWrap: "nowrap",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                alignContent: "center"
              }}
              initial="unActive"
              animate="active"
              exit="exit"
              variants={gameInstancesChildContainerVariants}
              center="x"
            >
              {renderGameInstances()}
            </Frame>
          )}
        </AnimatePresence>

        <Frame
          style={{
            display: "flex",
            backgroundColor: "rgba(214, 214, 214, 0)",
            position: "relative",
            width: "700px",
            height: "80px",
            flexWrap: "nowrap",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center"
          }}
          center="x"
        ></Frame>
        <NoGamesWarning />
      </Frame>
    </AnimatePresence>
  );
};

export default GameInstancesContainer;

const NoGamesWarning = () => {
  const gameInstances = useSelector(
    state => state.gameInstancesOverseer.gameInstances
  );

  const noGamesWarningVariants = {
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
      {!gameInstances && (
        <Frame
          id="no-games-warning"
          initial="unActive"
          animate="active"
          exit="unActive"
          variants={noGamesWarningVariants}
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
          No games currently
        </Frame>
      )}
    </AnimatePresence>
  );
};
