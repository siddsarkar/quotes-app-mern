import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Typography } from "@material-ui/core";

export default function Paginate(props) {
  React.useEffect(() => {
    console.log(props.onlyFooter);
  }, []);
  return (
    <div
      style={{
        margin: 10,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {props.onlyFooter === true ? null : (
        <Pagination
          //hideNextButton
          //hidePrevButton
          count={props.count}
          page={props.page}
          onChange={props.change}
        />
      )}
      <Typography
        style={{ marginTop: 5 }}
        color="textSecondary"
        variant="caption"
      >
        Copyright@2020_Siddhartha Sarkar
      </Typography>
    </div>
  );
}
