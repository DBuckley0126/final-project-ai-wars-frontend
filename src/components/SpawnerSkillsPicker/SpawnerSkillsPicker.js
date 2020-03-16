import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { Frame, AnimatePresence, useAnimation } from "framer";

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
    <Frame
      id="spawner-skills-picker"
      style={{
        width: "95%",
        height: "200px",
        backgroundColor: "",
        display: "flex",
        top: "150px",
        flexWrap: "nowrap",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "baseline",
        alignContent: "center"
      }}
      center="x"
    >
      <SkillSlideContainer
        key="melee"
        custom="1"
        skillName="melee"
        passSkillSlideValue={passSkillSlideValue}
        currentAvaliableSkillPoints={currentAvaliableSkillPoints}
      />
      <SkillSlideContainer
        key="range"
        custom="2"
        skillName="range"
        passSkillSlideValue={passSkillSlideValue}
        currentAvaliableSkillPoints={currentAvaliableSkillPoints}
      />
      <SkillSlideContainer
        key="vision"
        custom="3"
        skillName="vision"
        passSkillSlideValue={passSkillSlideValue}
        currentAvaliableSkillPoints={currentAvaliableSkillPoints}
      />
      <SkillSlideContainer
        key="health"
        custom="4"
        skillName="health"
        passSkillSlideValue={passSkillSlideValue}
        currentAvaliableSkillPoints={currentAvaliableSkillPoints}
      />
      <SkillSlideContainer
        key="movement"
        custom="5"
        skillName="movement"
        passSkillSlideValue={passSkillSlideValue}
        currentAvaliableSkillPoints={currentAvaliableSkillPoints}
      />
    </Frame>
  );
};

export default SpawnerSkillsPicker;

const SkillSlideContainer = props => {
  const name = props.skillName;
  const [currentScale, setCurrentScale] = useState(0);
  props.passSkillSlideValue({ name, currentScale });
  const skillPointRestrictionValue =
    currentScale + props.currentAvaliableSkillPoints;
  const custom = props.custom;
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

  const generateSkillSlideOptions = custom => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => {
      return (
        <SkillSlideOption
          key={index}
          index={index}
          custom={custom}
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

  const skillSlideContainerNameVariants = {
    unActive: {
      opacity: 0
    },
    active: custom => ({
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeIn",
        delay: custom / 10 + 7.4 + custom / 10
      }
    })
  };

  const skillSlideContainerResetButtonVariants = {
    unActive: {
      opacity: 0
    },
    active: custom => ({
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeIn",
        delay: custom / 10 + 8 + custom / 10
      }
    })
  };

  const skillSlideTotalNumberVariants = {
    unActive: {
      opacity: 0
    },
    active: custom => ({
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeIn",
        delay: custom / 10 + 9.4 + custom / 10
      }
    })
  };

  return (
    <Frame
      id={name}
      className="skill-slide-container"
      custom={custom}
      style={{
        width: "450px",
        height: "40px",
        backgroundColor: "",
        display: "flex",
        position: "relative",
        flexWrap: "nowrap",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        alignContent: "center"
      }}
      center="x"
    >
      <Frame
        className={"skill-slide-container-name"}
        custom={custom}
        key={name.charAt(0).toUpperCase() + name.substring(1)}
        style={{
          width: "80px",
          height: "40px",
          backgroundColor: "",
          left: "40px",
          justifyContent: "flex-end",
          color: "rgb(232, 232, 232)",
          fontFamily: "Maven Pro",
          fontSize: "22px",
          fontWeight: "500"
        }}
        initial="unActive"
        active="active"
        variants={skillSlideContainerNameVariants}
        center="y"
      >
        {name.charAt(0).toUpperCase() + name.substring(1)}
      </Frame>

      <Frame
        className="skill-slide"
        custom={custom}
        style={{
          width: "240px",
          height: "40px",
          display: "flex",
          flexWrap: "nowrap",
          backgroundColor: "",
          flexDirection: "row",
          justifyContent: "left",
          placeContent: "center",
          alignItems: "center",
          alignContent: "center",
          left: "150px"
        }}
      >
        <Frame
          className="skill-slide-reset-button"
          onClick={() => setCurrentScale(0)}
          custom={custom}
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "",
            rotate: 45,
            left: "-22px",
            y: -3,
            fontSize: "46px",
            fontFamily: "Maven Pro",
            color: "rgb(232, 232, 232)",
            fontWeight: "800",
            cursor: "pointer"
          }}
          center="y"
          initial="unActive"
          active="active"
          variants={skillSlideContainerResetButtonVariants}
        >
          +
        </Frame>
        {generateSkillSlideOptions(custom)}
      </Frame>
      <Frame
        className="skill-slide-total-number"
        custom={custom}
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "",
          left: "375px",
          fontSize: "24px",
          fontFamily: "Maven Pro",
          y: -3,
          color: "rgb(232, 232, 232)",
          fontWeight: "500"
        }}
        center="y"
        initial="unActive"
        active="active"
        variants={skillSlideTotalNumberVariants}
      >
        {currentScale}
      </Frame>
    </Frame>
  );
};

const SkillSlideOption = props => {
  const index = props.index;
  const setCurrentScale = props.setCurrentScale;
  const generateClassName = props.generateClassName;
  const setIsHovered = props.setIsHovered;
  const skillPointRestrictionValue = props.skillPointRestrictionValue;
  const custom = props.custom;

  const controls = useAnimation();

  const skillSlideContainerOptionVariants = {
    unActive: {
      opacity: 0,
      scaleY: 1,
      backgroundColor: "rgba(232, 232, 232, 0)"
    },
    active: {
      opacity: 1,
      scaleY: 1,
      backgroundColor: "rgba(232, 232, 232, 0)",
      transition: {
        duration: 0.2,
        ease: "easeIn",
        scaleY: {
          type: "spring",
          duration: 0.2
        },
        opacity: {
          delay: custom / 10 + 7.4 + (index + 6) / 10
        },
        delay: (10 - index) / 35
      }
    },
    hovered: {
      backgroundColor: "rgba(232, 232, 232, 1)",
      scaleY: 1.2,
      transition: {
        duration: 0.2,
        ease: "easeIn",
        scaleY: {
          type: "spring",
          duration: 0.2
        },
        delay: index / 35
      }
    },
    selected: {
      backgroundColor: "rgba(232, 232, 232, 1)",
      scaleY: 1.2,
      transition: {
        duration: 0.2,
        ease: "easeIn",
        scaleY: {
          type: "spring",
          duration: 0.2
        },
        delay: index / 35
      }
    }
  };

  const setCurrentScaleTest = () => {
    if (index <= skillPointRestrictionValue) setCurrentScale(index);
  };

  const generateOptionStyle = () => {
    switch (generateClassName(index)) {
      case "skill-slide-option skill-slide-option-selected":
        controls.start("selected");
        return {
          width: "20px",
          height: "20px",
          margin: "0px -1px",
          position: "relative",
          borderStyle: "solid",
          borderWidth: "2px",
          cursor: "pointer",
          borderColor: "rgba(232, 232, 232, 1)"
        };
      case "skill-slide-option skill-slide-option-hovered":
        controls.start("hovered");
        return {
          width: "20px",
          height: "20px",
          margin: "0px -1px",
          position: "relative",
          borderStyle: "solid",
          borderWidth: "2px",
          cursor: "pointer",
          borderColor: "rgba(232, 232, 232, 1)"
        };
      case "skill-slide-option skill-slide-option-available":
        controls.start("active");
        return {
          width: "20px",
          height: "20px",
          margin: "0px -1px",
          position: "relative",
          borderStyle: "solid",
          borderWidth: "2px",
          cursor: "pointer",
          borderColor: "rgba(232, 232, 232, 1)"
        };
      default:
        controls.start("active");
        return {
          width: "20px",
          height: "20px",
          margin: "0px -1px",
          position: "relative",
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "rgba(232, 232, 232, 0.5)"
        };
    }
  };

  return (
    <Frame
      key={`${index} + ${custom}`}
      id={`${index} + ${custom}`}
      className={generateClassName(index)}
      onClick={() => {
        setCurrentScaleTest();
      }}
      initial="unActive"
      animate={controls}
      variants={skillSlideContainerOptionVariants}
      style={generateOptionStyle()}
      onHoverStart={() => {
        setIsHovered({ hovered: true, value: index });
      }}
      onHoverEnd={() => {
        setIsHovered({ hovered: false, value: null });
      }}
    ></Frame>
  );
};
