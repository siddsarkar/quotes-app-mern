import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
//routes
import {
  Login,
  Articles,
  MyArticles,
  AddArticle,
  SingleArticle,
} from "../Routes/index";

const RootNav = (props) => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Link
            style={{
              marginRight: 10,
              textDecoration: "none",
              color: "whitesmoke",
            }}
            to="/"
          >
            <Typography>Quotes</Typography>
          </Link>
          <Link
            style={{
              marginRight: 10,
              textDecoration: "none",
              color: "whitesmoke",
            }}
            to="/addarticle"
          >
            <Typography>Write</Typography>
          </Link>
          <Link
            style={{
              marginRight: 10,
              textDecoration: "none",
              color: "whitesmoke",
            }}
            to="/myarticles"
          >
            <Typography>Activity</Typography>
          </Link>
          <Link
            style={{
              textDecoration: "none",
              color: "whitesmoke",
              position: "absolute",
              right: 20,
            }}
            to="/login"
          >
            <Typography>{props.isLoggedin ? "LOGOUT" : "LOGIN"}</Typography>
          </Link>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route path="/article/:id" exact component={SingleArticle} />
        <Route path="/addarticle" component={AddArticle} />
        <Route path="/myarticles" component={MyArticles} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Articles} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedin: state.users.isAuthenticated,
  };
};

export default connect(mapStateToProps)(RootNav);
