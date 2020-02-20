import React, { useEffect } from "react";

import MenuContainer from "./containers/MenuContainer/MenuContainer";
import { useSelector, useDispatch } from "react-redux";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import Instructions from "./containers/InstructionsContainer/InstructionsContainer";

import GameContainer from "./containers/GameContainer/GameContainer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useRouteMatch,
  useParams
} from "react-router-dom";

const App = () => {
  const startApp = useSelector(state => state.app.startApp);
  const startGame = useSelector(state => state.app.startGame);
  // const history = useHistory();

  const generateAppState = () => {
    // if (startGame) {
    //   return <GameContainer />;
    // } else if (startApp) {
    //   return <MenuContainer />;
    // } else {
    //   return <SplashScreen />;
    // }

    if (startApp) {
      return <GameContainer />;
    } else {
      return <SplashScreen />;
    }
  };

  return (
    <>
      <Switch>
        <Route exact path={"/"}>
          {generateAppState()}
        </Route>
        <Route path="/how-to-use">
          <Instructions />
        </Route>
      </Switch>
    </>
  );
};

export default App;
