import { put, call, takeEvery, takeLatest, delay } from "redux-saga/effects";

import * as importedActions from "./appActions";

export default function* appWatchers() {
  yield takeEvery("CHECK_BACKEND_SERVER_STATUS", checkBackendSeverStatus);
}

function* checkBackendSeverStatus(action) {
  const fetchPayload = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: {}
  };

  const actions = importedActions;
  let response = false;

  try {
    if (window.location.hostname === "localhost") {
      response = yield fetch("http://localhost:3000/ping");
    } else {
      response = yield fetch(
        "https://final-project-ai-wars-backend.herokuapp.com/ping"
      );
    }

    if (!response.ok) throw "ERROR: No Response from backend sever";
  } catch (error) {
    console.log("WARNING: Waiting for backend sever to boot");
    yield delay(500);
    yield put(actions.checkBackendSeverStatus());
  }

  if (response.ok) {
    const data = yield response.json();
    if (data.success) {
      yield put(actions.toggleBackendSeverActive(true));
    } else {
      yield put(actions.checkBackendSeverStatus());
    }
  }
}
