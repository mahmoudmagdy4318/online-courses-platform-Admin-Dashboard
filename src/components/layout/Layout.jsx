import React from "react";
import NavBar from "./Drawer";

const Layout = (Cmp) => (props) => {
  return (
    <>
      <NavBar cmp={Cmp} navprops={props} />
    </>
  );
};

export default Layout;
