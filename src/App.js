import React, { useEffect } from "react";

import MenuContainer from "./containers/MenuContainer/MenuContainer";
import { useSelector, useDispatch } from "react-redux";
import SplashScreen from "./components/SplashScreen/SplashScreen";

import GameContainer from "./containers/GameContainer/GameContainer";

const App = () => {
  const startApp = useSelector(state => state.app.startApp);
  const startGame = useSelector(state => state.app.startGame);

  // const auth0Loading = useSelector(state => state.auth0.isLoading);

  const generateAppState = () => {
    // if (startGame) {
    //   return <GameContainer />;
    // } else if (startApp) {
    //   return <MenuContainer />;
    // } else {
    //   return <SplashScreen />;
    // }
    return <GameContainer />;
  };

  return <>{generateAppState()}</>;
};

export default App;
