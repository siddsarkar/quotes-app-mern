import React from "react";
import {
  BottomNavigationAction,
  BottomNavigation,
  makeStyles,
  createStyles,
} from "@material-ui/core";

import {
  LocationOn,
  Favorite,
  Restore,
  Bookmark,
  MoreHoriz,
  Share,
  FavoriteOutlined,
  FavoriteBorderOutlined,
  BookmarkBorderOutlined,
  ShareOutlined,
  MoreHorizOutlined,
} from "@material-ui/icons";
import {
  AppBar,
  CardActions,
  colors,
  IconButton,
  Toolbar,
} from "@material-ui/core";

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
  const [value, setValue] = React.useState(0);

  return (
    <CardActions className={classes.root}>
      <IconButton color="inherit">
        {isliked ? <Favorite color="inherit" /> : <FavoriteBorderOutlined />}
      </IconButton>
      <IconButton color="inherit">
        <BookmarkBorderOutlined />
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
