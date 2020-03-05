import React, { useEffect } from "react";

import MenuContainer from "./containers/MenuContainer/MenuContainer";
import { useSelector, useDispatch } from "react-redux";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import Instructions from "./containers/InstructionsContainer/InstructionsContainer";
import { Frame, AnimatePresence } from "framer";

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

  // if (startApp) {
  //   return <GameContainer />;
  // } else {
  //   return <SplashScreen />;
  //{startApp && <MenuContainer />}
  //{startGame && <GameContainer />}
  // }

  return (
    <>
      <Switch>
        <Route exact path={"/"}>
          <AnimatePresence initial={false}>
            {!startApp && <SplashScreen />}
            {startApp && <MenuContainer />}
            {startGame && <GameContainer />}
          </AnimatePresence>
        </Route>
        <Route path="/how-to-use">
          <Instructions />
        </Route>
      </Switch>
    </>
  );
};

export default App;
