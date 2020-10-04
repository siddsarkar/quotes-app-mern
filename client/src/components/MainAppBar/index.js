import React from "react";
import { Link } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { GitHub, Search } from "@material-ui/icons";

export default function MainAppBar({ isLoggedin }) {
  return (
    <AppBar position="relative" style={{ zIndex: 9999 }}>
      <Toolbar variant="dense">
        <Link
          style={{
            textDecoration: "none",
            marginRight: 5,
          }}
          to="/"
        >
          <Typography variant="inherit" style={{ color: "white" }}>
            QUOTES
          </Typography>
        </Link>
        <Link
          style={{
            textDecoration: "none",
            marginRight: 5,
          }}
          to="/addarticle"
        >
          <Typography variant="inherit" style={{ color: "white" }}>
            WRITE
          </Typography>
        </Link>
        <Link
          style={{
            textDecoration: "none",
          }}
          to="/myarticles"
        >
          <Typography variant="inherit" style={{ color: "white" }}>
            ACTIVITY
          </Typography>
        </Link>
        <Link
          style={{
            textDecoration: "none",
            position: "absolute",
            right: 20,
          }}
          to="/login"
        >
          <Typography style={{ color: "white" }} variant="inherit">
            {isLoggedin ? "LOGOUT" : "LOGIN"}
          </Typography>
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
