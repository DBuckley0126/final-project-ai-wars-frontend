import { useRef, useState, useEffect } from "react";
import useMousePosition from "./../useMousePosition/useMousePosition";

function useAutoScroll() {

  const ref = useRef(null);

  let scrollUp = false;
  let scrollDown = false;

  const onMouseMove = event => {

    let mouseRelativeXY = {
      x: event.pageX - (ref.current.offsetLeft - (ref.current.offsetWidth / 2)),
      y: event.pageY - (ref.current.offsetTop - (ref.current.offsetHeight / 2))
    };

    let refDimensions = {
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight
    };

    // Relative to ref top Left
    const areaCooridatesA = {
      topLeft: { x: 0, y: 0 },
      bottomRight: {
        x: refDimensions.width,
        y: (refDimensions.height / 100) * 20
      }
    };

    // Relative to ref top Left
    const areaCooridatesB = {
      topLeft: { x: 0, y: (refDimensions.height / 100) * 80 },
      bottomRight: { x: refDimensions.width, y: refDimensions.height }
    };

    const mouseWithinSection = areaCooridates => {
      if (
        mouseRelativeXY.x >= areaCooridates.topLeft.x &&
        mouseRelativeXY.y >= areaCooridates.topLeft.y
      ) {
        if (
          mouseRelativeXY.x <= areaCooridates.bottomRight.x &&
          mouseRelativeXY.y <= areaCooridates.bottomRight.y
        ) {
          return true;
        }
      }
      return false;
    };

    if (mouseWithinSection(areaCooridatesA)) {
      console.log("Mouse in A")
      scrollUp = true;
      scrollDown = false;
    } else if (mouseWithinSection(areaCooridatesB)) {
      console.log("Mouse in B")
      scrollDown = true;
      scrollUp = false;
    } else {
      scrollUp = false;
      scrollDown = false;
    }
  };

  const checkDirection = () => {
    if (scrollUp) ref.current.scrollTop = ref.current.scrollTop - 1;
    if (scrollDown) ref.current.scrollTop = ref.current.scrollTop + 2;

    setTimeout(checkDirection, 4);
  };

  checkDirection();

  useMousePosition(onMouseMove);

  return [ref];
}

export default useAutoScroll;
