import { useEffect, useState } from "react";
const useMousePosition = callback => {
  useEffect(() => {
    const triggerCallback = event => callback(event);
    window.addEventListener("mousemove", triggerCallback);
    return () => {
      window.removeEventListener("mousemove", triggerCallback);
    };
  }, []);
};

export default useMousePosition;
