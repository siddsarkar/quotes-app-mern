import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import AddArticleScreen from "./routes/AddArticle";
import Articles from "./routes/Articles";
import Login from "./routes/Login";
import MyArticles from "./routes/MyArticles";
import SingleArticle from "./routes/SingleArticle";
import getArticleAuthor from "./routes/AuthorArticles";

function App(props) {
  return (
    <Router>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Link
            style={{
              marginRight: 10,
              textDecoration: "none",
              color: "whitesmoke",
            }}
            to="/"
          >
            <Typography variant="inherit">QUOTES</Typography>
          </Link>
          <Link
            style={{
              marginRight: 10,
              textDecoration: "none",
              color: "whitesmoke",
            }}
            to="/addarticle"
          >
            <Typography variant="inherit">WRITE</Typography>
          </Link>
          <Link
            style={{
              marginRight: 10,
              textDecoration: "none",
              color: "whitesmoke",
            }}
            to="/myarticles"
          >
            <Typography variant="inherit">ACTIVITY</Typography>
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
            <Typography variant="inherit">
              {props.isLoggedin ? "LOGOUT" : "LOGIN"}
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route
          path="/article/:authorId/articles"
          exact
          component={getArticleAuthor}
        />
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
