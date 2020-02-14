import { useRef, useState, useEffect } from "react";

function useHover(callbackMouseOver, callbackMouseOut) {
  // const [value, setValue] = useState(false);

  const ref = useRef(null);
  const event = null;

  const handleMouseOver = event => {
    event = event;
    callbackMouseOver(event);
  };
  const handleMouseOut = event => {
    event = event;
    callbackMouseOut(event);
  };

  useEffect(
    () => {
      
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", event => handleMouseOver(event));
        node.addEventListener("mouseout", event => handleMouseOut(event));

        return () => {
          node.removeEventListener("mouseover", event =>
            handleMouseOver(event)
          );
          node.removeEventListener("mouseout", event => handleMouseOut(event));
        };
      }
    },
    [] // Recall only if ref changes
  );

  return [ref, event];
}

export default useHover;
