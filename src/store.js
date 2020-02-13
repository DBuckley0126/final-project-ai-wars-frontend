import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/rootReducer";
import createSagaMiddleware from "redux-saga";
import Auth0Watcher from "./hooks/useAuth0/useAuth0Watchers";

const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState) {
  let store = {};

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  let createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )(createStore);

  store = createStoreWithMiddleware(rootReducer, initialState);

  sagaMiddleware.run(Auth0Watcher);

  return store;
}

const store = configureStore();

export default store;
