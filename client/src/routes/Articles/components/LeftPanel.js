import React from "react";
import {
  Hidden,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { DataUsage, Flare, LabelImportant, Loyalty } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function LeftPanel({ username, loggedIn }) {
  return (
    <Hidden xsDown>
      <ListItem dense={true}>
        <ListItemAvatar>
          <Avatar>{username.substr(0, 1).toUpperCase() || "X"}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            loggedIn ? (
              username
            ) : (
              <Typography
                style={{ textDecoration: "none" }}
                component={Link}
                to="/login"
              >
                Login/Signup
              </Typography>
            )
          }
          primaryTypographyProps={{ variant: "h5" }}
          secondary={
            <span>
              <Typography variant="caption">
                <DataUsage fontSize="inherit" />
                {" " + Date().substr(0, 15)}
              </Typography>
            </span>
          }
        />
      </ListItem>
      <List dense={true}>
        <ListItem>
          <Flare style={{ marginRight: 10 }} />
          <ListItemText primary="Highlights" />
        </ListItem>
        <ListItem>
          <LabelImportant style={{ marginRight: 10 }} />
          <ListItemText primary="Popular" />
        </ListItem>
        <ListItem>
          <Loyalty style={{ marginRight: 10 }} />
          <ListItemText primary="Trending" />
        </ListItem>
      </List>
    </Hidden>
  );
}
