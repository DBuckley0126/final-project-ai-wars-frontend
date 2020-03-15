import React from "react";
import { Frame, AnimatePresence } from "framer";
import acquireColourArray from "../../hooks/acquireColourArray/acquireColourArray";

const PixelingBackdrop = props => {
  return generatePixelings(props.exitSignal);
};

export default PixelingBackdrop;

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
  } else if (favour == "north") {
    directionHash["north2"] = { x: 0, y: 50 };
    directionHash["north3"] = { x: 0, y: 50 };
    directionHash["north4"] = { x: 0, y: 50 };
  } else if (favour == "east") {
    directionHash["east2"] = { x: 50, y: 0 };
    directionHash["east3"] = { x: 50, y: 0 };
    directionHash["east4"] = { x: 50, y: 0 };
  } else if (favour == "south") {
    directionHash["south2"] = { x: 0, y: -50 };
    directionHash["south3"] = { x: 0, y: -50 };
    directionHash["south4"] = { x: 0, y: -50 };
  }

  const keys = Object.keys(directionHash);
  return directionHash[keys[(keys.length * Math.random()) << 0]];
};

const generatePaths = (initial, favour) => {
  let pathArrayY = [initial["y"]];
  let pathArrayX = [initial["x"]];

  for (let i = 0; i < 200; i++) {
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

const generatePixelings = exitSignal => {
  const clientHeight = document.documentElement.clientHeight;
  const clientWidth = document.documentElement.clientWidth;

  const rightHandSideX = Math.ceil((clientWidth / 2 + 100) / 50) * 50;
  const rightHandSideY = Math.ceil((clientHeight / 2 + 100) / 50) * 50;
  const leftHandSideX = Math.ceil(-(clientWidth / 2 + 100) / 50) * 50;
  const leftHandSideY = Math.ceil((clientHeight / 2 - 100) / 50) * 50;
  const bottomSideX = Math.ceil(((clientWidth / 2) * -1) / 50) * 50;
  const bottomSideY = Math.ceil((clientHeight / 2 + 100) / 50) * 50;
  const topSideX = Math.ceil(((clientWidth / 2) * -1) / 50) * 50;
  const topSideY = Math.ceil(((clientHeight / 2) * -1 - 100) / 50) * 50;

  let initalPositionArrayWest = [
    {
      x: rightHandSideX,
      y: rightHandSideY - Math.ceil(((clientHeight / 4) * 1) / 50) * 50
    },
    {
      x: rightHandSideX,
      y: rightHandSideY - Math.ceil(((clientHeight / 4) * 2) / 50) * 50
    },
    {
      x: rightHandSideX,
      y: rightHandSideY - Math.ceil(((clientHeight / 4) * 3) / 50) * 50
    },
    {
      x: rightHandSideX,
      y: rightHandSideY - Math.ceil(((clientHeight / 4) * 4) / 50) * 50
    }
  ];

  let initalPositionArrayEast = [
    {
      x: leftHandSideX,
      y: leftHandSideY - Math.ceil(((clientHeight / 4) * 1) / 50) * 50
    },
    {
      x: leftHandSideX,
      y: leftHandSideY - Math.ceil(((clientHeight / 4) * 2) / 50) * 50
    },
    {
      x: leftHandSideX,
      y: leftHandSideY - Math.ceil(((clientHeight / 4) * 3) / 50) * 50
    },
    {
      x: leftHandSideX,
      y: leftHandSideY - Math.ceil(((clientHeight / 4) * 4) / 50) * 50
    }
  ];

  let initalPositionArraySouth = [
    { x: bottomSideX, y: bottomSideY },
    {
      x: bottomSideX + Math.ceil(((clientWidth / 4) * 1) / 50) * 50,
      y: bottomSideY
    },
    {
      x: bottomSideX + Math.ceil(((clientWidth / 4) * 2) / 50) * 50,
      y: bottomSideY
    },
    {
      x: bottomSideX + Math.ceil(((clientWidth / 4) * 3) / 50) * 50,
      y: bottomSideY
    },
    {
      x: bottomSideX + Math.ceil(((clientWidth / 4) * 4) / 50) * 50,
      y: bottomSideY
    }
  ];

  let initalPositionArrayNorth = [
    { x: topSideX, y: topSideY },
    {
      x: topSideX + Math.ceil(((clientWidth / 1) * 1) / 50) * 50,
      y: topSideY
    },
    {
      x: topSideX + Math.ceil(((clientWidth / 2) * 1) / 50) * 50,
      y: topSideY
    },
    {
      x: topSideX + Math.ceil(((clientWidth / 3) * 1) / 50) * 50,
      y: topSideY
    },
    {
      x: topSideX + Math.ceil(((clientWidth / 4) * 1) / 50) * 50,
      y: topSideY
    }
  ];

  let pathArray = [];

  for (let i = 0; i < 4; i++) {
    let paths = generatePaths(initalPositionArrayWest[i], "west");

    pathArray.push({
      pathX: paths.pathArrayX,
      pathY: paths.pathArrayY,
      favour: "west"
    });
  }

  for (let i = 0; i < 4; i++) {
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

  for (let i = 0; i < 5; i++) {
    let paths = generatePaths(initalPositionArrayNorth[i], "north");

    pathArray.push({
      pathX: paths.pathArrayX,
      pathY: paths.pathArrayY,
      favour: "north"
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
      exitSignal={exitSignal}
    />
  ));
};

const Pixeling = props => {
  const key = props.prop_key;
  const pathX = props.pathX;
  const pathY = props.pathY;
  const initialX = props.initialX;
  const initialY = props.initialY;
  const favour = props.favour;
  const exitSignal = props.exitSignal;
  const colourObject = acquireColourArray();

  const generatePixelingVariants = () => {
    if (favour === "north" || favour === "south") {
      return {
        unActive: {
          opacity: 0
        },
        active: {
          x: pathX,
          y: pathY,
          opacity: 1,
          transition: {
            duration: 280,
            ease: "easeInOut",
            opacity: { duration: 0.1 },
            delay: 2
          }
        },
        exit: {
          y: initialY,
          transition: {
            duration: 0.5,
            ease: "easeInOut",
            delay: 0.2
          }
        }
      };
    } else if (favour === "east" || favour === "west") {
      return {
        unActive: {
          opacity: 0
        },
        active: {
          x: pathX,
          y: pathY,
          opacity: 1,
          transition: {
            duration: 280,
            ease: "easeInOut",
            opacity: { duration: 0.1 },
            delay: 2
          }
        },
        exit: {
          x: initialX,
          transition: {
            duration: 0.5,
            ease: "easeInOut",
            delay: 0.2
          }
        }
      };
    }
  };

  return (
    <AnimatePresence>
      {!exitSignal && (
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
          animate={"active"}
          exit={"exit"}
          shadow={colourObject.shadow}
          variants={generatePixelingVariants()}
        ></Frame>
      )}
    </AnimatePresence>
  );
};