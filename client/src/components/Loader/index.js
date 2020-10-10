import React from "react";
import { Typography } from "@material-ui/core";

export default function Loader() {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        height: "100%",
        width: "100%",
      }}
    >
      <Typography color="textSecondary" variant="overline">
        Loading...
      </Typography>
    </div>
  );
}
