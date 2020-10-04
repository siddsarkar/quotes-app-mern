import React from "react";
import { CircularProgress } from "@material-ui/core";

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
