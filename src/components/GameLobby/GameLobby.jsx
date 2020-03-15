import React from "react";

import { useSelector, useDispatch } from "react-redux";
import "./GameLobby.scss";
import ReadyUpButton from "../ReadyUpButton/ReadyUpButton";
import LobbyColourPicker from "../LobbyColourPicker/LobbyColourPicker";
import useLocalUserType from "../../hooks/useLocalUserType/useLocalUserType";
import { Frame, AnimatePresence, useAnimation } from "framer";

const GameLobby = () => {
  const lobbyData = useSelector(state => state.gameOverseer.lobbyData);
  const showLobby = useSelector(state => state.app.showLobby);
  const startGame = useSelector(state => state.app.startGame);

  const controls = useAnimation();

  const local_user_type = useLocalUserType();

  let hostUserLobbyColour = lobbyData.attributes.host_user_colour;
  let joinUserLobbyColour = lobbyData.attributes.join_user_colour;

  const generateUserName = user => {
    if (user.given_name) {
      return user.given_name;
    } else {
      if (local_user_type === "host_user") {
        return "Player 1";
      } else {
        return "Player 2";
      }
    }
  };

  const userLobbyProfilePictureContainerVariants = {
    unActive: {
      scale: 0
    },
    active: {
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        delay: 1.1
      }
    },
    exit: {
      scale: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        delay: 0.5
      }
    }
  };

  const userLobbyProfileSkillRatingVariants = {
    unActive: {
      opacity: 0,
      transition: {
        duration: 0.4,
        delay: 0
      }
    },
    active: {
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 1.7
      }
    }
  };

  const userLobbyProfileNameVariants = {
    unActive: {
      opacity: 0,
      transition: {
        duration: 0.4,
        delay: 0.2
      }
    },
    active: {
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 1.5
      }
    }
  };

  const userlobbyProfileWaitingVariants = {
    unActive: {
      opacity: 0
    },
    active: {
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 1.4
      }
    },
    exit: {
      opcaity: 0,
      transition: {
        duration: 1,
        delay: 0
      }
    }
  };



  const renderUserAttributes = user => {
    
    return (
      <AnimatePresence>
        {user && user.picture && (
          <Frame
            className={"user-lobby-profile-picture-container"}
            key={`user-lobby-profile-picture-container-${user.id}`}
            initial="unActive"
            animate="active"
            exit="exit"
            style={{
              width: "180px",
              height: "180px",
              backgroundColor: "rgba(232, 232, 232, 0)",
              y: "-70%",
              display: "flex",
              justifyContent: "center"
            }}
            center
            variants={userLobbyProfilePictureContainerVariants}
          >
            <img
              src={user.picture}
              alt="User Icon"
              className={"user-lobby-profile-picture"}
            ></img>
          </Frame>
        )}

        {user && !startGame && (
          <Frame
            center
            key={`user-lobby-profile-name-${user.id}`}
            initial="unActive"
            animate="active"
            exit="unActive"
            style={{
              backgroundColor: "rgba(232, 232, 232, 0)",
              y: "0%"
            }}
            variants={userLobbyProfileNameVariants}
            className={"user-lobby-profile-name"}
          >
            {generateUserName(user)}
          </Frame>
        )}

        {user && !startGame && user.skill_rating && (
          <Frame
            key={`user-lobby-profile-skill-rating-${user.id}`}
            initial="unActive"
            animate="active"
            exit="unActive"
            style={{
              backgroundColor: "rgba(232, 232, 232, 0)",
              y: "20%"
            }}
            center
            variants={userLobbyProfileSkillRatingVariants}
            className={"user-lobby-profile-skill-rating"}
          >
            {user.skill_rating}
          </Frame>
        )}

        {!user && !startGame && (
          <Frame
            className={"user-lobby-profile-waiting"}
            center
            initial="unActive"
            animate="active"
            exit="unActive"
            style={{
              backgroundColor: "",
              y: "-40%"
            }}
            variants={userlobbyProfileWaitingVariants}
          >
            Waiting
          </Frame>
        )}
      </AnimatePresence>
    );
  };

  const lobbyContainerHostVariants = {
    unActive: {
      width: "0%",
      x: "0px",
      transition: {
        duration: 1,
        ease: "easeInOut",
        delay: 0.2
      }
    },
    active: {
      width: "50%",
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  const lobbyContainerHostInfoVariants = {
    unActive: {
      opacity: 0
    },
    active: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        delay: 1
      }
    }
  };

  const lobbyContainerJoinVariants = {
    unActive: {
      width: "0%",
      x: "0px",
      transition: {
        duration: 1,
        ease: "easeInOut",
        delay: 0.2
      }
    },
    active: {
      width: "50%",
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  const lobbyContainerJoinInfoVariants = {
    unActive: {
      opacity: 0
    },
    active: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        delay: 1
      }
    }
  };

  return (
    <AnimatePresence>
      {showLobby && (
        <Frame
          id="host-user-lobby-container"
          key="host-user-lobby-container"
          style={{
            height: "100%",
            position: "absolute",
            left: 0
          }}
          initial="unActive"
          animate="active"
          exit="unActive"
          variants={lobbyContainerHostVariants}
          center="y"
          backgroundColor={hostUserLobbyColour}
        >
          <Frame
            id="host-user-lobby-info-container"
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              backgroundColor: ""
            }}
            variants={lobbyContainerHostInfoVariants}
            center
          >
            {renderUserAttributes(lobbyData.attributes.host_user)}
            {local_user_type === "host_user" && <LobbyColourPicker />}
          </Frame>
        </Frame>
      )}
      {showLobby && (
        <Frame
          id="join-user-lobby-container"
          key="join-user-lobby-container"
          style={{
            height: "100%",
            position: "absolute",
            right: 0
          }}
          initial="unActive"
          animate="active"
          exit={"unActive"}
          variants={lobbyContainerJoinVariants}
          center="y"
          backgroundColor={joinUserLobbyColour}
        >
          <AnimatePresence>
            <Frame
              id="join-user-lobby-info-container"
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                backgroundColor: ""
              }}
              variants={lobbyContainerJoinInfoVariants}
              center
            >
              {renderUserAttributes(lobbyData.attributes.join_user)}
              {local_user_type === "join_user" && <LobbyColourPicker />}
            </Frame>
          </AnimatePresence>
        </Frame>
      )}
      )}
      <ReadyUpButton lobbyData={lobbyData} />
    </AnimatePresence>
  );
};

export default GameLobby;
