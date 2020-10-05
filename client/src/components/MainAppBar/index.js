import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { GitHub, Search } from "@material-ui/icons";

export default function MainAppBar({ isLoggedin }) {
  return (
    <AppBar position="relative" style={{ zIndex: 9999 }}>
      <Toolbar variant="dense" style={{ margin: 0, padding: 0 }}>
        <Link
          style={{
            textDecoration: "none",
            // marginRight: 5,
          }}
          to="/"
        >
          <Button>
            <Typography variant="body1" style={{ color: "white" }}>
              FEED
            </Typography>
          </Button>
        </Link>
        <Link
          style={{
            textDecoration: "none",
            // marginRight: 5,
          }}
          to="/addarticle"
        >
          <Button>
            <Typography variant="body1" style={{ color: "white" }}>
              WRITE
            </Typography>
          </Button>
        </Link>
        <Link
          style={{
            textDecoration: "none",
          }}
          to="/myarticles"
        >
          <Button>
            <Typography variant="body1" style={{ color: "white" }}>
              ACTIVITY
            </Typography>
          </Button>
        </Link>
        <Link
          style={{
            textDecoration: "none",
            position: "absolute",
            right: 20,
          }}
          to="/login"
        >
          <Button>
            <Typography style={{ color: "white" }} variant="body1">
              {isLoggedin ? "LOGOUT" : "LOGIN"}
            </Typography>
          </Button>
        </Link>
        <IconButton
          href="https://github.com/siddsarkar/quotes-app-mern"
          aria-label="Github repo"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <GitHub />
        </IconButton>
        <Link
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
          to="/search"
        >
          <IconButton
            color="inherit"
            aria-label="search"
            aria-controls="menu-appbar"
            aria-haspopup="true"
          >
            <Search />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
