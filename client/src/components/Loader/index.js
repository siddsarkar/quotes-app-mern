import { Container, CircularProgress } from "@material-ui/core";
import React from "react";

export default function Loader() {
  return (
    <Container
      maxWidth={false}
      style={{
        height: "100vh",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Container>
  );
}
