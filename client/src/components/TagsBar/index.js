import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, CardActions, Chip } from "@material-ui/core";
import { TrendingUp } from "@material-ui/icons";

//custom - utils
import ElevationScroll from "../../utils/ElevationScroll";

export default function TagsBar(props) {
  const { curTag } = props;
  const chipRef = React.useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (chipRef.current === null) {
        return;
      } else {
        chipRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  });

  return (
    <ElevationScroll {...props}>
      <AppBar position="sticky">
        <CardActions className="example">
          {props.tags.map((tag, i) => {
            return (
              <Chip
                key={i}
                component={Link}
                to={"/tags/" + tag.name}
                ref={curTag === tag.name ? chipRef : null}
                color={curTag === tag.name ? "primary" : "default"}
                onClick={
                  props.onClick === undefined
                    ? null
                    : () => props.onClick(tag.name)
                }
                clickable
                icon={<TrendingUp />}
                label={"#" + tag.name}
              />
            );
          })}
        </CardActions>
      </AppBar>
    </ElevationScroll>
  );
}
