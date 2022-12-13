import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Outlet } from "react-router";
import Header from "../../components/Header";

export default function AppLayout() {
  return (
    <Container fluid className="AppLayout">
      <Header />
      <Outlet />
    </Container>
  );
}
