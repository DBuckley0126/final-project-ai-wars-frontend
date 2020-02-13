import React from "react";
import Header from "../Header/Header";
import StartAppButton from "../StartAppButton/StartAppButton";
import useAuth0 from "../../hooks/useAuth0/useAuth0";

const SplashScreen = () => {
  useAuth0();

  return (
    <>
      <Header />
      <StartAppButton />
    </>
  );
};

export default SplashScreen;
