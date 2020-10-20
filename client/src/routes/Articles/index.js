import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

//actions
import {
  getAllArticles,
  getArticleByAuthor,
  clearArticles,
} from "../../store/actions/articleActions";
import { getCommentsForArticle } from "../../store/actions/commentActions";

//components
import { TagsBar } from "../../components";
import { CenterPanel, LeftPanel, RightPanel } from "./components";

class Articles extends Component {
  mounted = false;
  state = {
    isLoading: true,
    page: 1,
    pageCount: 0,
    sort: "none",
  };

  cb = () => {
    this.mounted &&
      this.setState({
        pageCount: this.props.pageCount,
        isLoading: false,
      });
  };

  componentDidMount() {
    this.mounted = true;
    this.props.initArticles(this.cb, {
      sort_by: this.state.sort,
      page: this.state.page,
    });
  }
  componentWillUnmount() {
    this.props.clearArticles();
    this.mounted = false;
  }

  onPageChange = (page) => {
    console.log("getting page %d", page + 1);
    const data = {
      sort_by: this.state.sort,
      page: page + 1,
    };
    this.mounted &&
      this.setState(
        this.setState((prevState) => ({
          page: page + 1,
          isLoading: true,
        })),
        () => {
          this.props.initArticles(this.cb, data);
        }
      );
  };

  handleSort = (sort) => {
    this.props.clearArticles();
    this.setState(this.setState({ sort: sort, isLoading: true }), () => {
      const data = {
        sort_by: this.state.sort,
        page: 1,
      };
      this.props.initArticles(this.cb, data);
    });
  };

  render() {
    const { articles, tags, username, loggedIn } = this.props;
    const { page, pageCount, isLoading } = this.state;
    return (
      <>
        <TagsBar tags={tags} />
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid
            item
            lg={3}
            xl={2}
            md={3}
            sm={4}
            xs={false}
            // style={{ backgroundColor: "lightpink" }}
          >
            <LeftPanel username={username} loggedIn={loggedIn} />
          </Grid>
          <Grid
            item
            lg={6}
            xl={8}
            md={7}
            sm={8}
            xs={12}
            // style={{ backgroundColor: "lightcoral" }}
          >
            <CenterPanel
              articles={articles}
              page={page}
              pageCount={pageCount}
              onPageChange={this.onPageChange}
              isLoading={isLoading}
              handleSort={this.handleSort}
            />
          </Grid>
          <Grid
            item
            lg={3}
            xl={2}
            md={1}
            sm={false}
            xs={false}
            // style={{ backgroundColor: "lightcyan" }}
          >
            <RightPanel />
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.articles.tags,
    pageCount: state.articles.pages,
    articles: state.articles.articles,
    comments: state.comments.comments,
    username: state.users.authenticatedUsername,
    loggedIn: state.users.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initArticles: (callback, data) => dispatch(getAllArticles(callback, data)),
    getComments: (id) => dispatch(getCommentsForArticle(id)),
    getautthorarticles: (id) => dispatch(getArticleByAuthor(id)),
    clearArticles: () => dispatch(clearArticles()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
