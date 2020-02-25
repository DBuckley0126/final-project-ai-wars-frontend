import { put, call, takeEvery, takeLatest, delay } from "redux-saga/effects";

import * as importedActions from "./gameOverseerSubscriptionActions";
const uuidv4 = require("uuid/v4");

export default function* gameOverseerCableWatchers() {
  yield takeEvery(
    "INIT_GAME_OVERSEER_SUBSCRIPTION",
    initGameOverseerSubscription
  );
  yield takeEvery("EXIT_LOBBY", exitLobby);
  yield takeEvery("ADD_CABLE", addCable);
  yield takeEvery("UPDATE_USER_LOBBY_STATUS", updateUserLobbyStatus);
  yield takeEvery("START_GAME_REQUEST", startGameRequest);
  yield takeEvery("SEND_PLAYER_TURN", sendPlayerTurn);
  yield takeEvery("INIT_TURN_HANDLER", turnHandler);
}

let cable = null;
let gameOverseerSub = null;
let dispatch = null;

function* addCable(action) {
  const actions = importedActions;
  try {
    yield (cable = action.payload.cable);
    yield (dispatch = action.payload.dispatch);
  } catch (error) {
    console.log(error);
    yield put(actions.updateErrorForGameOverseer(true));
  }
}

function* sendPlayerTurn(action) {
  const actions = importedActions;
  try {
    gameOverseerSub.sendPlayerTurn(action.payload);
  } catch (error) {
    console.log(error);
    yield put(actions.updateErrorForGameOverseer(true));
  }
}

function* updateUserLobbyStatus(action) {
  const actions = importedActions;
  try {
    gameOverseerSub.updateUserLobbyStatus(action.payload);
  } catch (error) {
    console.log(error);
    yield put(actions.updateErrorForGameOverseer(true));
  }
}

function* startGameRequest() {
  const actions = importedActions;
  try {
    gameOverseerSub.startGameRequest();
  } catch (error) {
    console.log(error);
    yield put(actions.updateErrorForGameOverseer(true));
  }
}

function* initGameOverseerSubscription(action) {
  let gameUuid = uuidv4();
  if (action.payload["gameUuid"]) gameUuid = action.payload["gameUuid"];

  const requestType = action.payload.requestType;
  const actions = importedActions;

  try {
    gameOverseerSub = yield cable.subscriptions.create(
      {
        channel: "GameOverseerChannel",
        game_uuid: gameUuid,
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
        unsubscribed: function() {
          this.perform("unsubscribed");
        },
        updateUserLobbyStatus: function(payload) {
          this.perform("update_user_lobby_status", payload);
        },
        startGameRequest: function() {
          this.perform("start_game_request");
        },
        sendPlayerTurn: function(payload) {
          this.perform("init_player_turn", payload);
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
      case "start_game":
        dispatch(actions.updateStartGame(true));
        break;
      case "update_game":
        switch (data["action"]) {
          case "UPDATE_GAME_OF_TURN":
            dispatch(actions.initTurnHandler(data.body));
            break;
          default:
            console.log("WARNING: Unable to process data received from socket");
            console.log(data);
        }
        break;
      case "unsubscribed":
        switch (data["action"]) {
          case "CANCEL_LOBBY":
            dispatch(actions.exitLobby());
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

function* exitLobby(action) {
  const actions = importedActions;

  try {
    yield put(actions.updateStartGame(false));
    yield gameOverseerSub.unsubscribe();
    yield put(actions.resetGameOverseer());
    yield (gameOverseerSub = null);
  } catch (error) {
    console.log(error);
    yield put(actions.updateErrorForGameOverseer(true));
  }
}

function* turnHandler(action) {
  const actions = importedActions;

  const map_states = action.payload.turn.data.attributes.map_states_for_turn;

  yield put(actions.updateGameOfTurn(action.payload));

  for (const stepNumber in map_states) {
    yield put(
      actions.updateMapState({
        stepNumber: stepNumber,
        mapState: map_states[stepNumber]
      })
    );
    yield delay(1000);
  }
}
