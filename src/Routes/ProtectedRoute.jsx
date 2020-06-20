import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import axiosInstance from "../API/axiosInstance";
import { getToken } from "../services/tokenService";
import { useEffect } from "react";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  const history = useHistory();
  useEffect(() => {
    axiosInstance.get("admin").catch((error) => {
      history.push("/login");
    });
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!getToken()) {
          return <Redirect to={{ pathname: "/login" }} />;
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};
export default ProtectedRoute;
