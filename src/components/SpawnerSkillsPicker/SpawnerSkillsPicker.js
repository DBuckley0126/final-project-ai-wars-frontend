import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

import "./SpawnerSkillsPicker.scss";

var diff = require("deep-diff").diff;

const SpawnerSkillsPicker = props => {
  const [
    currentAvaliableSkillPoints,
    setCurrentAvaliableSkillPoints
  ] = useState(10);

  const [currentSkills, setCurrentSkills] = useState({
    melee: 0,
    range: 0,
    vision: 0,
    health: 0,
    movement: 0
  });

  const passSkillSlideValue = passedHash => {
    let copyCurrentSkills = currentSkills;

    copyCurrentSkills[passedHash.name] = passedHash.currentScale;

    setCurrentSkills(copyCurrentSkills);

    props.passSkillHash(currentSkills);

    let totalOfSkillPoints =
      currentSkills.melee +
      currentSkills.range +
      currentSkills.vision +
      currentSkills.health +
      currentSkills.movement;

    setCurrentAvaliableSkillPoints(10 - totalOfSkillPoints);
  };

  return (
    <div id="spawner-skills-picker">
      <SkillSlideContainer
        key="melee"
        skillName="melee"
        passSkillSlideValue={passSkillSlideValue}
        currentAvaliableSkillPoints={currentAvaliableSkillPoints}
      />
      <SkillSlideContainer
        key="range"
        skillName="range"
        passSkillSlideValue={passSkillSlideValue}
        currentAvaliableSkillPoints={currentAvaliableSkillPoints}
      />
      <SkillSlideContainer
        key="vision"
        skillName="vision"
        passSkillSlideValue={passSkillSlideValue}
        currentAvaliableSkillPoints={currentAvaliableSkillPoints}
      />
      <SkillSlideContainer
        key="health"
        skillName="health"
        passSkillSlideValue={passSkillSlideValue}
        currentAvaliableSkillPoints={currentAvaliableSkillPoints}
      />
      <SkillSlideContainer
        key="movement"
        skillName="movement"
        passSkillSlideValue={passSkillSlideValue}
        currentAvaliableSkillPoints={currentAvaliableSkillPoints}
      />
    </div>
  );
};

export default SpawnerSkillsPicker;

const SkillSlideContainer = props => {
  const name = props.skillName;
  const [currentScale, setCurrentScale] = useState(0);
  props.passSkillSlideValue({ name, currentScale });
  const skillPointRestrictionValue =
    currentScale + props.currentAvaliableSkillPoints;
  const [isHovered, setIsHovered] = useState({ hovered: false, value: null });

  const generateClassName = index => {
    if (index <= currentScale) {
      return "skill-slide-option skill-slide-option-selected";
    } else if (
      isHovered.hovered &&
      index <= isHovered.value &&
      index <= skillPointRestrictionValue
    ) {
      return "skill-slide-option skill-slide-option-hovered";
    } else if (index <= skillPointRestrictionValue) {
      return "skill-slide-option skill-slide-option-available";
    } else {
      return "skill-slide-option";
    }
  };

  const generateSkillSlideOptions = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => {
      return (
        <SkillSlideOption
          key={index}
          index={index}
          currentScale={currentScale}
          setCurrentScale={setCurrentScale}
          generateClassName={generateClassName}
          setIsHovered={setIsHovered}
          currentAvaliableSkillPoints
          skillPointRestrictionValue={skillPointRestrictionValue}
        />
      );
    });
  };

  return (
    <div id={name} className="skill-slide-container">
      <p>{name.charAt(0).toUpperCase() + name.substring(1)}</p>
      <div className="skill-slide">
        <button onClick={() => setCurrentScale(0)}>X</button>
        {generateSkillSlideOptions()}
      </div>
    </div>
  );
};

const SkillSlideOption = props => {
  const index = props.index;
  const setCurrentScale = props.setCurrentScale;
  const generateClassName = props.generateClassName;
  const setIsHovered = props.setIsHovered;
  const skillPointRestrictionValue = props.skillPointRestrictionValue;

  const setCurrentScaleTest = () => {
    if (index <= skillPointRestrictionValue) setCurrentScale(index);
  };

  return (
    <button
      key={index}
      id={index}
      className={generateClassName(index)}
      onClick={() => {
        setCurrentScaleTest();
      }}
      onMouseEnter={() => setIsHovered({ hovered: true, value: index })}
      onMouseLeave={() => setIsHovered({ hovered: false, value: null })}
    ></button>
  );
};
