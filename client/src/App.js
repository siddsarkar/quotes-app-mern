import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { GitHub } from "@material-ui/icons";

import AddArticleScreen from "./routes/AddArticle";
import Articles from "./routes/Articles";
import Login from "./routes/Login";
import MyArticles from "./routes/MyArticles";
import SingleArticle from "./routes/SingleArticle";
import getArticleAuthor from "./routes/AuthorArticles";
import LikesPage from "./routes/Likes";

function App(props) {
  return (
    <Router>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Link
            style={{
              textDecoration: "none",
            }}
            to="/"
          >
            <Button>
              <Typography variant="inherit" style={{ color: "white" }}>
                QUOTES
              </Typography>
            </Button>
          </Link>
          <Link
            style={{
              textDecoration: "none",
            }}
            to="/addarticle"
          >
            <Button>
              <Typography variant="inherit" style={{ color: "white" }}>
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
              <Typography variant="inherit" style={{ color: "white" }}>
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
              <Typography style={{ color: "white" }} variant="inherit">
                {props.isLoggedin ? "LOGOUT" : "LOGIN"}
              </Typography>
            </Button>
          </Link>
          <IconButton
            href="https://github.com/siddsarkar/quotes-app-mern"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <GitHub />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route
          path="/article/:authorId/articles"
          exact
          component={getArticleAuthor}
        />
        <Route path="/likes/:id" exact component={LikesPage} />
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
