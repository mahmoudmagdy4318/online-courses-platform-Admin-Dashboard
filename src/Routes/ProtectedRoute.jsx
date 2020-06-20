import React from "react";
import { Route, Redirect } from "react-router-dom";
import axiosInstance from "../API/axiosInstance";
import { getToken } from "../services/tokenService";
import { useEffect } from "react";

const ProtectedRoute = (props) => {
  useEffect(() => {
    const token = getToken();
    if (!token) return <Redirect to={{ pathname: "/login" }} />;
    axiosInstance.get("admin").catch((error) => {
      console.error({ error });
    });
  }, []);

  return <Route {...props} />;
};
export default ProtectedRoute;
