import { delay } from "redux-saga";
import { put, call, takeEvery, takeLatest } from "redux-saga/effects";

import * as actions from "./useAuth0Actions";

export default function* useAuth0Watcher() {
  yield takeLatest("SYNC_USER", syncUser);
}

const checkRes = res => {
  if (!res.ok) {
    throw res;
  }
};

function* syncUser(action) {

  let configurationObject = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      given_name: action.payload.given_name,
      family_name: action.payload.family_name,
      locale: action.payload.locale,
      picture: action.payload.picture,
      email: action.payload.given_name,
      sub: action.payload.sub
    })
  };

  try {
    yield put(actions.updateAuth0({ attemptingSync: true }));
    let res = yield fetch(
      "http://localhost:3000/user/create",
      configurationObject
    );
    yield checkRes(res);
    let json = yield res.json();
    let userData = json.data;
    console.log(userData);
    yield put(actions.updateAuth0({ attemptingSync: false, synced: true }));
  } catch (error) {
    console.log(error);
  }
}
