import React from "react";
import { useSelector } from "react-redux";

const SpawnerOverview = () => {
  const spawnersDataArray = useSelector(
    state => state.gameOverseer.gameData.spawners
  );

  const generateSpawnerDivs = () => {
    return spawnersDataArray.map(spawnerData => {
      return <SpawnerInstance key={spawnerData.id} spawnerData={spawnerData} />;
    });
  };

  return <div id="spawner-overview">{generateSpawnerDivs()}</div>;
};

export default SpawnerOverview;

const SpawnerInstance = props => {
  const spawnerData = props.spawnerData;
  return (
    <div>
      <p>Spawner </p>
      {spawnerData.id}
    </div>
  );
};
