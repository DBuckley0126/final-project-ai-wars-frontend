import React, { useEffect } from "react";

import MenuContainer from "./components/Menu/MenuContainer/MenuContainer";
import { useSelector, useDispatch } from "react-redux";
import SplashScreen from "./components/SplashScreen/SplashScreen";

const App = () => {
  const startApp = useSelector(state => state.app.startApp);

  // const auth0Loading = useSelector(state => state.auth0.isLoading);

  return <>{startApp ? <MenuContainer /> : <SplashScreen />}</>;
};

export default App;
