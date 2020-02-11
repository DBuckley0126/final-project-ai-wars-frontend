import React from "react";
import ReactDOM from "react-dom";
import "./scss/App.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Auth0 setup
import { Auth0Provider } from "./contexts/auth0-context";

// Redux setup
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";

let store = null;
if (process.env.NODE_ENV === "production") {
  console.log("Production Build");
  store = createStore(rootReducer);
} else {
  console.log("Development Build");
  store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider>
      <App />
    </Auth0Provider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
