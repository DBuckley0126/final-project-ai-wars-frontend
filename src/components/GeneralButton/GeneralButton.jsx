import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./GeneralButton.scss";

import { exitLobby } from "./GeneralButtonActions";

const GeneralButton = () => {
  const gameSubscriptionActive = useSelector(
    state => state.gameOverseer.subscriptionActive
  );

  const dispatch = useDispatch();

  const renderButton = () => {
    if (gameSubscriptionActive) {
      return (
        <div className="general-button general-button-exit-game">
          <button onClick={() => dispatch(exitLobby())}>X</button>
        </div>
      );
    } else {
      return <div className="general-button general-button-create-game">+</div>;
    }
  };

  return renderButton();
};

export default GeneralButton;
