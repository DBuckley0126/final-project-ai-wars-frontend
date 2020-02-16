import { delay } from "redux-saga";
import { put, call, takeEvery, takeLatest } from "redux-saga/effects";

import * as importedActions from "./gameOverseerSubscriptionActions";

export default function* gameOverseerCable0Watchers() {
  yield takeEvery(
    "INIT_GAME_OVERSEER_SUBSCRIPTION",
    initGameOverseerSubscription
  );
}

function* initGameOverseerSubscription(action) {
  const gameId = action.payload.gameId;
  const requestType = action.payload.requestType;
  const cable = action.cable;
  const actions = importedActions;
  const dispatch = action.dispatch;

  let gameOverseerSub = null;

  try {
    gameOverseerSub = yield cable.subscriptions.create(
      {
        channel: "GameOverseerChannel",
        game_id: gameId,
        request_type: requestType
      },
      {
        received: function(data) {
          dataHandler(data);
        },
        rejected: function() {
          console.log("WARNING: Game subscription rejected from server");
          dispatch(actions.rejectGameSubscription(true));
        },
        unsubscribed: function(data) {
          this.perform("unsubscribed");
        }
      }
    );
    yield put(actions.addGameOverseerSub(gameOverseerSub));
  } catch (error) {
    console.log(error);
    yield put(actions.updateErrorForGameOverseer(true));
  }

  const dataHandler = data => {
    switch (data["type"]) {
      case "subscribed":
        switch (data["action"]) {
          case "SUCCESSFULLY_SUBSCRIBED_TO_GAME":
            break;
          default:
            console.log("WARNING: Unable to process data received from socket");
            console.log(data);
        }
        break;
      case "update_game_lobby":
        dispatch(actions.updateGameLobby(data.body));
        break;
      case "unsubscribed":
        switch (data["action"]) {
          case "SUCCESSFULLY_UNSUBSCRIBED_TO_GAME":
            dispatch(actions.successfullyUnsubscribedToGame());
            break;
          default:
            console.log("WARNING: Unable to process data received from socket");
            console.log(data);
        }
      default:
        console.log("WARNING: Unable to process data received from socket");
        console.log(data);
    }
  };
}
