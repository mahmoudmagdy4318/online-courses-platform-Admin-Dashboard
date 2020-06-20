import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { makeStyles } from "@material-ui/core";

// const useStyles = makeStyles(() => ({
//   Dashboard: {
//     color: "red",
//     fontSize: 100,
//   },
// }));
function Dashboard() {
  // const classes = useStyles();
  const {
    data: { user: currentUser },
  } = useContext(UserContext);
  return <div></div>;
}

export default Layout(Dashboard);
