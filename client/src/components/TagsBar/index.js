import { AppBar, CardActions, Chip } from "@material-ui/core";
import { TrendingUp } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import ElevationScroll from "../../utils/ElevationScroll";

export default function TagsBar(props) {
  return (
    <ElevationScroll {...props}>
      <AppBar position="sticky" style={{ backgroundColor: "white" }}>
        <CardActions>
          {props.tags.map((tag, i) => (
            <Link
              key={i}
              style={{ textDecoration: "none" }}
              to={"/tags/" + tag}
            >
              <Chip
                color={props.color === tag ? "primary" : "default"}
                onClick={
                  props.onClick === undefined ? null : () => props.onClick(tag)
                }
                clickable
                icon={<TrendingUp />}
                label={"#" + tag}
              />
            </Link>
          ))}
        </CardActions>
      </AppBar>
    </ElevationScroll>
  );
}
