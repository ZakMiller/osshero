import { experimentalStyled } from "@material-ui/core/styles";
import type { ReactNode } from "react";
import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

interface LayoutProps {
  children?: ReactNode;
}

const LayoutWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  paddingTop: "80px",
}));

export default function Layout(props: LayoutProps) {
  return (
    <LayoutWrapper>
      <Nav />
      <Outlet />
    </LayoutWrapper>
  );
}
