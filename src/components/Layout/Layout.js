import React from "react";
import { Layout as LayoutStyled } from "./Layout.styled";
const Layout = function ({ children = null }) {
  return <LayoutStyled className="container">{children}</LayoutStyled>;
};
export default Layout;
