import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGameRequest } from './CountDownTimerActions';

const CountDownTimer = props => {
  const [timeValue, setTimerValue] = useState(3);
  const dispatch = useDispatch();

  useEffect(() => {
    let timerInternal = null;

    timerInternal = setInterval(() => {
      if (timeValue === 1) {
        dispatch(startGameRequest());
      }
      if (timeValue > 0) {
        setTimerValue(timeValue - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timerInternal);
    };
  }, [dispatch, timeValue]);

  return timeValue;
};

export default CountDownTimer;
