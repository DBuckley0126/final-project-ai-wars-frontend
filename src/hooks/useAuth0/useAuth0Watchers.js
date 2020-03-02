import { delay } from "redux-saga";
import { put, call, takeEvery, takeLatest } from "redux-saga/effects";

import * as actions from "./useAuth0Actions";

export default function* useAuth0Watchers() {
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
    body: JSON.stringify({ JWT: action.payload })
  };

  try {
    let res = yield fetch(
      "https://final-project-ai-wars-backend.herokuapp.com/user/create",
      configurationObject
    );
    yield checkRes(res);
    let data = yield res.json();
    yield put(
      actions.updateAuth0({
        synced: true,
        persisted: data.persisted,
        apiToken: data.api_token
      })
    );
  } catch (error) {
    console.log(error);
    yield put(actions.updateAuth0({ synced: false }));
  }
}
