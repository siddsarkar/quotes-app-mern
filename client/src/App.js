import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
//routes
import ArticlesComponent from "./routes/HomeScreen/Home";
import LoginComponent from "./routes/LoginScreen/Login";
import MyArticlesComponent from "./routes/MyArticlesScreen/MyArticles";
import AddArticleComponent from "./routes/AddArticle/AddArticle";
import { connect } from "react-redux";
import { userLogoutRequest } from "./store/actions/usersActions";

function App(props) {
  return (
    <Router>
      <div>
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
              to="/myArticles"
            >
              <Typography>My Quotes</Typography>
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
          <Route path="/addarticle">
            <AddArticleComponent />
          </Route>
          <Route path="/myarticles">
            <MyArticlesComponent />
          </Route>
          <Route path="/login">
            <LoginComponent />
          </Route>
          <Route path="/">
            <ArticlesComponent />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedin: state.users.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userLogoutRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
