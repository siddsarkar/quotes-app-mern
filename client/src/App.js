import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import AddArticleScreen from "./Routes/AddArticle/AddArticle";
import Articles from "./Routes/Articles/Articles";
import Login from "./Routes/Login/Login.js";
import MyArticles from "./Routes/MyArticles/MyArticles";
import SingleArticle from "./Routes/SingleArticle/SingleArticle";

function App(props) {
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
        <Route path="/addarticle" component={AddArticleScreen} />
        <Route path="/myarticles" component={MyArticles} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Articles} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedin: state.users.isAuthenticated,
  };
};

export default connect(mapStateToProps)(App);
