import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Accordion,
  AccordionSummary,
  Collapse,
  Paper,
  AccordionDetails,
  makeStyles,
  fade,
  InputBase,
} from "@material-ui/core";
import { GitHub, ExpandMore, Search } from "@material-ui/icons";

import AddArticleScreen from "./routes/AddArticle";
import Articles from "./routes/Articles";
import Login from "./routes/Login";
import MyArticles from "./routes/MyArticles";
import SingleArticle from "./routes/SingleArticle";
import getArticleAuthor from "./routes/AuthorArticles";
import LikesPage from "./routes/Likes";
import SearchPage from "./routes/Search";

function App(props) {
  return (
    <Router>
      <AppBar position="sticky">
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
              {props.isLoggedin ? "LOGOUT" : "LOGIN"}
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
            <IconButton color="inherit">
              <Search />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route
          path="/article/:authorId/articles"
          exact
          component={getArticleAuthor}
        />
        <Route path="/search" exact component={SearchPage} />
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
