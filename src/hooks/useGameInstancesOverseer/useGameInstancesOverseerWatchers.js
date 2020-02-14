import { delay } from "redux-saga";
import { put, call, takeEvery, takeLatest } from "redux-saga/effects";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "./useGameInstancesOverseerActions";

let subscription = null;

export default function* useGameInstancesOverseerWatchers() {
  yield takeLatest("JOIN_GAME", joinGame);
}

const checkRes = res => {
  if (!res.ok) {
    throw res;
  }
};

function* joinGame(action) {
  console.log("sage join game hit");
  let payload = {
    channel: "game_instances_overseer_channel",
    type: "subscribed",
    action: "SUCCESSFULLY_SUBSCRIBED",
    header: {},
    body: { test: "test" }
  };

  try {
    yield subscription.joinGame(payload);
    // let res = yield fetch(
    //   "http://localhost:3000/user/create",
    //   configurationObject
    // );
    // yield checkRes(res);
    // let data = yield res.json();
    // yield put(
    //   actions.updateAuth0({
    //     synced: true,
    //     persisted: data.persisted,
    //     apiToken: data.api_token
    //   })
    // );
  } catch (error) {
    console.log(error);
    // yield put(actions.updateAuth0({ synced: false }));
  }
}
