import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { removeToken } from "../../services/tokenService";

const Logout = () => {
  const {
    actions: { setUser },
  } = useContext(UserContext);
  const history = useHistory();
  removeToken();
  setUser({});
  history.push("/login");
  return null;
};

export default Logout;
