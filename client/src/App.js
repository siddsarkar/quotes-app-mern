import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//components
import { MainAppBar } from "./components";

//pages or screens
import {
  ArticlesPage,
  AddArticlePage,
  MyArticlesPage,
  LoginPage,
  LikesPage,
  TagsPage,
  AuthorArticlesPage,
  SearchPage,
  SingleArticlePage,
} from "./routes";

class App extends Component {
  render() {
    const { isLoggedin } = this.props;
    return (
      <Router>
        <MainAppBar isLoggedin={isLoggedin} />
        <Switch>
          <Route
            path="/article/:authorId/articles"
            exact
            component={AuthorArticlesPage}
          />
          <Route path="/tags/:tag" exact component={TagsPage} />
          <Route path="/likes/:id" exact component={LikesPage} />
          <Route path="/article/:id" exact component={SingleArticlePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/addarticle" component={AddArticlePage} />
          <Route path="/myarticles" component={MyArticlesPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/" exact component={ArticlesPage} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedin: state.users.isAuthenticated,
});

export default connect(mapStateToProps)(App);
