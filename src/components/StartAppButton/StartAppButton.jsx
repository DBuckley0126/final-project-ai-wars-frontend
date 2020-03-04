import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { startApp } from "./startAppButtonActions";

import "./StartAppButton.scss";

const StartAppButton = () => {
  const dispatch = useDispatch();
  const userSynced = useSelector(state => state.auth0.synced);
  const user = useSelector(state => state.auth0.user);

  // nickname for non google user
  // given_name for google user
  const handleClick = event => {
    dispatch(startApp());
  };

  if (!userSynced) {
    return null;
  }

  const generate_button = () => {
    if (user.given_name) {
      return (
        <div id="start-app-box">
          <img id="start-app-box-user-picture" src={user.picture} alt="User Profile"></img>
          <p id="start-app-box-user-name">{user.given_name}</p>
          <button id="start-app-button" onClick={event => handleClick(event)}>
            Start
          </button>
        </div>
      );
    } else {
      return (
        <div id="start-app-box">
          <img id="start-app-box-user-picture" src={user.picture} alt="User Profile"></img>
          <p id="start-app-box-user-name">{user.nickname}</p>
          <button id="start-app-button" onClick={event => handleClick(event)}>
            Start
          </button>
        </div>
      );
    }
  };

  return generate_button();
};

export default StartAppButton;
