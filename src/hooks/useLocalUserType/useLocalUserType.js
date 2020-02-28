import { useSelector } from "react-redux";

const useLocalUserType = () => {
  const lobbyData = useSelector(state => state.gameOverseer.lobbyData);
  const local_user = useSelector(state => state.auth0.user);

  const local_user_type = () => {
    if (local_user.sub === lobbyData.attributes.host_user.sub) {
      return "host_user";
    } else if (local_user.sub === lobbyData.attributes.join_user.sub) {
      return "join_user";
    } else {
      return;
    }
  };
  return local_user_type();
};

export default useLocalUserType;
