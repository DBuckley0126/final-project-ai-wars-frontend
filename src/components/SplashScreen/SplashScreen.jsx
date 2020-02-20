import React from "react";
import Header from "../Header/Header";
import StartAppButton from "../StartAppButton/StartAppButton";
import useAuth0 from "../../hooks/useAuth0/useAuth0";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useRouteMatch,
  useParams
} from "react-router-dom";

const SplashScreen = () => {
  useAuth0();

  return (
    <>
      <Header />
      <StartAppButton />
      <nav>
        <Link to={"/how-to-use"}>How to use</Link>
      </nav>
    </>
  );
};

export default SplashScreen;
