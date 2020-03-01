import { delay } from "redux-saga";
import { put, call, takeEvery, takeLatest } from "redux-saga/effects";
import ActionCable from "action-cable-react-jwt";

import * as importedActions from "./actionCableWatcherActions";

export default function* actionCableWatchers() {
  yield takeLatest("INIT_ACTION_CABLE", initActionCable);
}

function* initActionCable(action) {
  const actions = importedActions;
  const apiToken = action.payload.apiToken;
  const dispatch = action.payload.dispatch;

  let cable = null;

  try {
    if (window.location.hostname === "localhost") {
      cable = yield ActionCable.createConsumer(
        `ws://localhost:3000/cable`,
        apiToken
      );
    } else {
      cable = yield ActionCable.createConsumer(
        `wss://final-project-ai-wars-backend.herokuapp.com/cable`,
        apiToken
      );
    }
    if (!cable) throw "ERROR: Unable to create cable";
    yield put(actions.addCable({ cable, dispatch }));
  } catch (error) {
    console.log(error);
  }
}
