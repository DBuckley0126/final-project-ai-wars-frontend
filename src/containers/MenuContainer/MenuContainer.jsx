import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameInstancesContainer from "../GameInstancesContainer/GameInstancesContainer";
import { initActionCable } from "./MenuContainerActions";
import { Frame, AnimatePresence } from "framer";

import GameLobby from "../../components/GameLobby/GameLobby";
import GeneralButton from "../../components/GeneralButton/GeneralButton";

import "./MenuContainer.scss";

const MenuContainer = () => {

  const dispatch = useDispatch();
  const apiToken = useSelector(state => state.auth0.apiToken);
  const cable = useSelector(state => state.gameInstancesOverseer.cable);

  useEffect(() => {
    dispatch(initActionCable({ apiToken, dispatch }));
  }, [apiToken, dispatch]);

  const subscriptionActive = useSelector(
    state => state.gameOverseer.subscriptionActive
  );

  const renderGameLobby = () => {
    if (subscriptionActive) {
      return <GameLobby />;
    }
    return null;
  };

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
    }
  };

  return (
    <Frame
      className="menu-container"
      initial={"unActive"}
      animate={"active"}
      width="100%"
      height="100%"
      style={{
        backgroundColor: "rgb(19, 19, 19)",
        position: "fixed",
        top: 0,
        left: 0
      }}
      variants={menuContainerVariants}
    >
      {renderGameInstances()}
      {renderGameLobby()}
      <GeneralButton />
    </Frame>
  );
};

export default MenuContainer;
