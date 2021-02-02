import React from "react";
import Header from "src/components/Header";
import LayoutStyled from "./Layout.styled";
const Layout = function ({ children = null }) {
  return (
    <LayoutStyled className="container">
      <Header />
      {children}
    </LayoutStyled>
  );
};
export default Layout;
