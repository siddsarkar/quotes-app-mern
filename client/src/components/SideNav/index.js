import React from "react";
import {
  CardActions,
  CardContent,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import {
  Bookmark,
  BookmarkOutlined,
  BookOutlined,
  Favorite,
  FavoriteBorderOutlined,
  ShareOutlined,
  BookmarkBorderOutlined,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "red",
    position: "fixed",
    height: "40vh",
    width: "15%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
}));

export default function SideNav(props) {
  const { isliked = false, isBookMarked = false } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CardContent>
        <div>
          <IconButton>
            {isliked ? (
              <Favorite color="secondary" />
            ) : (
              <FavoriteBorderOutlined />
            )}
          </IconButton>
        </div>
        <div>
          <IconButton>
            {isBookMarked ? (
              <Bookmark color="secondary" />
            ) : (
              <BookmarkBorderOutlined />
            )}
          </IconButton>
        </div>
        <div>
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </div>
      </CardContent>
    </div>
  );
}
