import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useRouteMatch,
  useParams
} from "react-router-dom";

const InstructionsContainer = () => {
  return (
    <>
      <h1>How to play AI Wars</h1>
      <nav>
        <Link to={"/"}>Home</Link>
        <br></br>
        <Link to={"/how-to-use/basics"}>The Basics</Link>
        <br></br>
        <Link to={"/how-to-use/complex"}>The Complex</Link>
      </nav>
      <Route path="/how-to-use/basics">
        <h1>The basics</h1>
      </Route>
      <Route path="/how-to-use/complex">
        <h1>The Complex</h1>
      </Route>
    </>
  );
};

export default InstructionsContainer;
