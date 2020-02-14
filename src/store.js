import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/rootReducer";
import createSagaMiddleware from "redux-saga";
import useAuth0Watchers from "./hooks/useAuth0/useAuth0Watchers";
import useGameInstancesOverseerWatchers from './hooks/useGameInstancesOverseer/useGameInstancesOverseerWatchers'

const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState) {
  let store = {};

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  let createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )(createStore);

  store = createStoreWithMiddleware(rootReducer, initialState);

  sagaMiddleware.run(useAuth0Watchers);
  sagaMiddleware.run(useGameInstancesOverseerWatchers);

  return store;
}

const store = configureStore();

export default store;
