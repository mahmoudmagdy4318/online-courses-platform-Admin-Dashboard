import React, { useState, useEffect } from "react";
import { decodeToken } from "../services/tokenService";

export const UserContext = React.createContext();

const Provider = (props) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    try {
      const payload = decodeToken();
      setUser(payload);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ data: { user }, actions: { setUser } }}>
      {props.children}
    </UserContext.Provider>
  );
};
export default Provider;
