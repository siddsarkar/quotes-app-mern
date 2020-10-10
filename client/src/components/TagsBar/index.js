import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, CardActions, Chip } from "@material-ui/core";
import { TrendingUp } from "@material-ui/icons";

//custom - utils
import ElevationScroll from "../../utils/ElevationScroll";

export default function TagsBar(props) {
  const { curTag = false } = props;
  const chipRef = React.useRef();

  useEffect(() => {
    curTag && chipRef.current && chipRef.current.scrollIntoView(true);
  });

  return (
    <ElevationScroll {...props}>
      <AppBar position="sticky">
        <CardActions className="example">
          {props.tags.map((tag, i) => (
            <Chip
              key={i}
              component={Link}
              to={"/tags/" + tag.name}
              innerRef={curTag === tag.name ? chipRef : null}
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
          ))}
        </CardActions>
      </AppBar>
    </ElevationScroll>
  );
}
