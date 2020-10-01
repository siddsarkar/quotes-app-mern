import { Container, CircularProgress } from "@material-ui/core";
import React from "react";

export default function Loader() {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: "48vh",
        left: "48vw",
      }}
    >
      <CircularProgress />
    </div>
  );
}
