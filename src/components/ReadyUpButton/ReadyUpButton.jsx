import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateUserLobbyStatus } from "./ReadyUpButtonActions";
import CountDownTimer from "../CountDownTimer/CountDownTimer";

const ReadyUpButton = props => {
  const lobbyData = props.lobbyData;
  const dispatch = useDispatch();

  const generateReadyButtonState = () => {
    if (
      lobbyData.attributes.host_user_ready &&
      lobbyData.attributes.join_user_ready
    ) {
      return (
        <button
          className="ready-up-button ready-up-button-both-ready"
          onClick={() => {
            dispatch(updateUserLobbyStatus({ readyStatus: "TOGGLE" }));
          }}
        >
          <CountDownTimer />
        </button>
      );
    } else if (
      lobbyData.attributes.host_user_ready ||
      lobbyData.attributes.join_user_ready
    ) {
      return (
        <button
          className="ready-up-button ready-up-button-one-ready"
          onClick={() => {
            dispatch(updateUserLobbyStatus({ readyStatus: "TOGGLE" }));
          }}
        >
          One players ready
        </button>
      );
    } else {
      return (
        <button
          className="ready-up-button ready-up-button-one-ready"
          onClick={() => {
            dispatch(updateUserLobbyStatus({ readyStatus: "TOGGLE" }));
          }}
        >
          No player ready
        </button>
      );
    }
  };

  return generateReadyButtonState();
};

export default ReadyUpButton;
