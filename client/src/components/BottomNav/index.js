import React from "react";
import { makeStyles } from "@material-ui/core";

import {
  Favorite,
  Bookmark,
  FavoriteBorderOutlined,
  BookmarkBorderOutlined,
  ShareOutlined,
  MoreHorizOutlined,
} from "@material-ui/icons";
import { CardActions, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",

    bottom: 0,
    padding: theme.spacing(0.5),
    // margin: 0,
    justifyContent: "space-evenly",
    backgroundColor: theme.palette.background.default,
  },
}));

export default function BottomNav(props) {
  const { isliked, isBookmarked = false } = props;
  const classes = useStyles();

  return (
    <CardActions className={classes.root}>
      <IconButton color="inherit">
        {isliked ? <Favorite color="inherit" /> : <FavoriteBorderOutlined />}
      </IconButton>
      <IconButton color="inherit">
        {isBookmarked ? <Bookmark /> : <BookmarkBorderOutlined />}
      </IconButton>
      <IconButton color="inherit">
        <ShareOutlined />
      </IconButton>
      <IconButton color="inherit">
        <MoreHorizOutlined />
      </IconButton>
    </CardActions>
  );
}
