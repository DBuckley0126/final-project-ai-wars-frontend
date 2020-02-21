import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CoordinateView.scss";

const CoordinateView = () => {
  const coordinates = useSelector(
    state => state.gameOverseer.currentHighlightedCoordinate
  );

  return (
    <div id="coordinate-view">
      X: {coordinates.X} Y: {coordinates.Y}
    </div>
  );
};

export default CoordinateView;
