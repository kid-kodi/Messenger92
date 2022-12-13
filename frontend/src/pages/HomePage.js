import React from "react";
import Container from "react-bootstrap/esm/Container";

export default function HomePage() {
  let { profile } = JSON.parse(localStorage.getItem("user"));
  return (
    <Container>
      <h1>Welcome {profile.firstName + " " + profile.lastName} !</h1>
    </Container>
  );
}
