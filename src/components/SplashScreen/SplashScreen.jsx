import React from "react";
import StartAppButton from "../StartAppButton/StartAppButton";
import { Frame, AnimatePresence } from "framer";
import { useSelector, useDispatch } from "react-redux";
import useAuth0 from "../../hooks/useAuth0/useAuth0";

import "./SplashScreen.scss";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useRouteMatch,
  useParams
} from "react-router-dom";

const colourArray = () => {
  const array = [
    {
      colour: "rgba(0,255,232, 1)",
      shadow: "0 0 20px 1px rgba(0,255,232, 0.300)"
    },
    {
      colour: "rgba(255,0,248, 1)",
      shadow: "0 0 20px 1px rgba(255,0,248, 0.300)"
    },
    {
      colour: "rgba(184,2,249, 1)",
      shadow: "0 0 20px 1px rgba(184,2,249, 0.300)"
    },
    {
      colour: "rgba(47,251,1, 1)",
      shadow: "0 0 20px 1px rgba(47,251,1, 0.300)"
    },
    {
      colour: "rgba(251,126,0, 1)",
      shadow: "0 0 20px 1px rgba(251,126,0, 0.300)"
    },
    {
      colour: "rgba(0,30,255, 1)",
      shadow: "0 0 20px 1px rgba(0,30,255, 0.300)"
    },
    {
      colour: "rgba(235,255,0, 1)",
      shadow: "0 0 20px 1px rgba(235,255,0, 0.300)"
    },
    { colour: "rgba(255,0,0, 1)", shadow: "0 0 20px 1px rgba(255,0,0, 0.300)" }
  ];
  return array[Math.floor(Math.random() * array.length)];
};

const SplashScreen = () => {
  useAuth0();
  const startApp = useSelector(state => state.app.startApp);

  const randomDirection = favour => {
    const directionHash = {
      north: { x: 0, y: 50 },
      east: { x: 50, y: 0 },
      south: { x: 0, y: -50 },
      west: { x: -50, y: 0 },
      none: { x: 0, y: 0 },
      none2: { x: 0, y: 0 },
      none3: { x: 0, y: 0 },
      none4: { x: 0, y: 0 },
      none5: { x: 0, y: 0 },
      none6: { x: 0, y: 0 }
    };

    if (favour == "west") {
      directionHash["west2"] = { x: -50, y: 0 };
      directionHash["west3"] = { x: -50, y: 0 };
      directionHash["west4"] = { x: -50, y: 0 };
      directionHash["west5"] = { x: -50, y: 0 };
    } else if (favour == "north") {
      directionHash["north2"] = { x: 0, y: 50 };
      directionHash["north3"] = { x: 0, y: 50 };
      directionHash["north4"] = { x: 0, y: 50 };
      directionHash["north5"] = { x: 0, y: 50 };
    } else if (favour == "east") {
      directionHash["east2"] = { x: 50, y: 0 };
      directionHash["east3"] = { x: 50, y: 0 };
      directionHash["east4"] = { x: 50, y: 0 };
      directionHash["east5"] = { x: 50, y: 0 };
    } else if (favour == "south") {
      directionHash["south2"] = { x: 0, y: -50 };
      directionHash["south3"] = { x: 0, y: -50 };
      directionHash["south4"] = { x: 0, y: -50 };
      directionHash["south5"] = { x: 0, y: -50 };
    }

    const keys = Object.keys(directionHash);
    return directionHash[keys[(keys.length * Math.random()) << 0]];
  };

  const generatePaths = (initial, favour) => {
    let pathArrayY = [initial["y"]];
    let pathArrayX = [initial["x"]];

    for (let i = 0; i < 120; i++) {
      const direction = randomDirection(favour);
      let currentY = pathArrayY.slice(-1)[0];
      let currentX = pathArrayX.slice(-1)[0];
      let nextY = currentY + direction.y;
      let nextX = currentX + direction.x;
      pathArrayY.push(nextY);
      pathArrayX.push(nextX);
    }
    return { pathArrayY, pathArrayX };
  };

  const generatePixelings = () => {
    const clientHeight = document.documentElement.clientHeight;
    const clientWidth = document.documentElement.clientWidth;

    const rightHandSideX = clientWidth / 2 + 50;
    const rightHandSideY = clientHeight / 2 + 50;
    const leftHandSideX = -(clientWidth / 2 + 50);
    const leftHandSideY = clientHeight / 2 - 50;
    const bottomSideX = (clientWidth / 2) * -1;
    const bottomSideY = clientHeight / 2 + 50;

    let initalPositionArrayWest = [
      { x: rightHandSideX, y: rightHandSideY - ((clientHeight / 5) * 1)},
      { x: rightHandSideX, y: rightHandSideY - ((clientHeight / 5) * 2) },
      { x: rightHandSideX, y: rightHandSideY - ((clientHeight / 5) * 3) },
      { x: rightHandSideX, y: rightHandSideY - ((clientHeight / 5) * 4) },
      { x: rightHandSideX, y: rightHandSideY - ((clientHeight / 5) * 5) }
    ];

    let initalPositionArrayEast = [
      { x: leftHandSideX, y: leftHandSideY - ((clientHeight / 5) * 1) },
      { x: leftHandSideX, y: leftHandSideY - ((clientHeight / 5) * 2) },
      { x: leftHandSideX, y: leftHandSideY - ((clientHeight / 5) * 3) },
      { x: leftHandSideX, y: leftHandSideY - ((clientHeight / 5) * 4) },
      { x: leftHandSideX, y: leftHandSideY - ((clientHeight / 5) * 5) }
    ];

    let initalPositionArraySouth = [
      { x: bottomSideX, y: bottomSideY },
      { x: bottomSideX + ((clientWidth / 4) * 1), y: bottomSideY },
      { x: bottomSideX + ((clientWidth / 4) * 2), y: bottomSideY },
      { x: bottomSideX + ((clientWidth / 4) * 3), y: bottomSideY },
      { x: bottomSideX + ((clientWidth / 4) * 4), y: bottomSideY }
    ];

    let pathArray = [];

    for (let i = 0; i < 5; i++) {
      let paths = generatePaths(initalPositionArrayWest[i], "west");

      pathArray.push({
        pathX: paths.pathArrayX,
        pathY: paths.pathArrayY,
        favour: "west"
      });
    }

    for (let i = 0; i < 5; i++) {
      let paths = generatePaths(initalPositionArrayEast[i], "east");

      pathArray.push({
        pathX: paths.pathArrayX,
        pathY: paths.pathArrayY,
        favour: "east"
      });
    }

    for (let i = 0; i < 5; i++) {
      let paths = generatePaths(initalPositionArraySouth[i], "south");

      pathArray.push({
        pathX: paths.pathArrayX,
        pathY: paths.pathArrayY,
        favour: "south"
      });
    }
    return pathArray.map((pathSet, index) => (
      
      <Pixeling
        key={index}
        prop_key={index}
        pathX={pathSet.pathX}
        pathY={pathSet.pathY}
        initialX={pathSet.pathX[0]}
        initialY={pathSet.pathY[0]}
        favour={pathSet.favour}
      />
    ));
  };

  const splashScreenVarients = {
    unActive: {
      opacity: 0,
      transition: {
        delay: 1.5
      }
    },
    active: {
      opacity: 1,
      transition: {
        delay: 0
      }
    }
  };

  return (
    <Frame
      id="splash-screen"
      style={{
        backgroundColor: "rgb(19, 19, 19)",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0
      }}
      initial={"unActive"}
      animate={"active"}
      exit={"unActive"}
      variants={splashScreenVarients}
    >
      {generatePixelings()}
      <AnimatePresence>
        {!startApp && (
          <Frame
            style={{
              fontFamily: "'Maven Pro', sans-serif",
              fontSize: "220px",
              fontWeight: 500,
              color: "rgb(232, 232, 232)",
              height: "220px",
              marginTop: "30px"
            }}
            center="x"
            size={"100%"}
            background={""}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            id="splash-screen-title-container"
          >
            <Frame
              size={"100%"}
              background={""}
              style={{
                fontFamily: "'Maven Pro', sans-serif",
                fontSize: "220px",
                fontWeight: 500,
                color: "rgb(232, 232, 232)",
                height: "220px",
                marginTop: "30px"
              }}
              center="x"
              initial={{ textShadow: "0 0 12px rgba(250, 250, 250, 0.300)" }}
              animate={{ textShadow: "0 0 20px rgba(250, 250, 250, 0.45)" }}
              transition={{ ease: "easeInOut", duration: 2, yoyo: Infinity }}
              id="splash-screen-title"
            >
              AI Wars
            </Frame>
            <Frame
              size={"100%"}
              background={""}
              style={{
                fontFamily: "'Maven Pro', sans-serif",
                fontSize: "220px",
                fontWeight: 500,
                color: "rgb(232, 232, 232)",
                height: "220px",
                marginTop: "30px",
                textShadow: "rgba(255, 255, 255, 0.5) 0px 2px 3px"
              }}
              center="x"
              exit={{ opacity: 0 }}
              id="splash-screen-title-inner-shadow"
            >
              AI Wars
            </Frame>
          </Frame>
        )}
      </AnimatePresence>
      <StartAppButton />
      {/* <nav>
        <Link to={"/how-to-use"}>How to use</Link>
      </nav> */}
    </Frame>
  );
};

export default SplashScreen;

const Pixeling = props => {
  const startApp = useSelector(state => state.app.startApp);
  const key = props.prop_key;
  const pathX = props.pathX;
  const pathY = props.pathY;
  const initialX = props.initialX;
  const initialY = props.initialY;
  const favour = props.favour;
  const colourObject = colourArray();

  const generateExitPath = () => {
    if (favour === "north" || favour === "south") {
      return { y: initialY };
    } else if (favour === "east" || favour === "west") {
      return { x: initialX };
    }
  };

  const generatePixelingVariants = () => {

    if (favour === "north" || favour === "south") {
      return {
        unActive: {
        },
        active: {
          x: pathX,
          y: pathY,
          transition: {
            duration: 160,
            ease: "easeInOut"
          }
        },
        exit: {
          y: initialY,
          transition: {
            duration: 0.5,
            ease: "easeInOut"
          }
        }
      };
    } else if (favour === "east" || favour === "west") {
      return {
        unActive: {
        },
        active: {
          x: pathX,
          y: pathY,
          transition: {
            duration: 160,
            ease: "easeInOut"
          }
        },
        exit: {
          x: initialX,
          transition: {
            duration: 0.5,
            ease: "easeInOut"
          }
        }
      };
    }
  };

  return (
    <AnimatePresence>
      {!startApp && (
        <Frame
          class="splash-screen-pixeling"
          key={`splash-screen-pixeling-${key}`}
          center
          style={{
            height: "50px",
            width: "50px"
          }}
          initial={"unActive"}
          backgroundColor={colourObject.colour}
          // animate={{ x: pathX, y: pathY }}
          animate={"active"}
          // transition={{
          //   duration: 160,
          //   ease: "easeInOut"
          // }}
          // exit={() => generateExitPath()}
          exit={"exit"}
          shadow={colourObject.shadow}
          variants={generatePixelingVariants()}
        ></Frame>
      )}
    </AnimatePresence>
  );
};
