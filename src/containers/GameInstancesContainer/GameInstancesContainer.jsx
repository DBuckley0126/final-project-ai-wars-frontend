import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameInstance from "../../components/GameInstance/GameInstance";
import "./GameInstancesContainer.scss";
import useAutoScroll from "../../hooks/useAutoScroll/useAutoScroll";
import { initGameInstancesOverseerSubscription } from "./GameInstancesContainerActions";
import { Frame, AnimatePresence } from "framer";

const GameInstancesContainer = () => {
  const dispatch = useDispatch();

  const cable = useSelector(state => state.gameInstancesOverseer.cable);
  const userSynced = useSelector(state => state.auth0.synced);

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
      shadow: "0 0 0px 0px rgba(250, 250, 250, 0.300)"
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
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "baseline",
          alignContent: "center",
          overflowY: "hidden"
        }}
        width="800px"
        height="800px"
        inital="unActive"
        animate="active"
        variants={gameInstancesContainerVariants}
        center
      >
        {renderGameInstances()}
      </Frame>
    </AnimatePresence>
  );
};

export default GameInstancesContainer;
