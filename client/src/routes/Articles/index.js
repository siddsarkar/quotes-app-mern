import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllArticles,
  getArticleByAuthor,
} from "../../store/actions/articleActions";
import { getCommentsForArticle } from "../../store/actions/commentActions";
import { Container } from "@material-ui/core";
import MyCard from "../../components/Card";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate/Paginate";

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
    page: 0,
    pageCount: 0,
  };

  gotArticles = () => {
    this.setState({
      articles: this.props.articles,
      pageCount: this.props.pageCount,
      isLoading: false,
    });
  };
  componentDidMount = () => {
    this.props.initArticles(this.gotArticles, 1);
  };

  render() {
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <>
        <Container maxWidth="md" style={{ padding: 10 }}>
          {this.state.articles.map((item, index) => {
            return <MyCard key={item._id} item={item} />;
          })}
        </Container>
        <Paginate
          count={this.state.pageCount}
          page={this.state.page}
          change={(e, page) => {
            // e.preventDefault();
            this.setState(
              this.setState({ page: page, isLoading: true }),
              () => {
                this.props.initArticles(this.gotArticles, page);
              }
            );
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pageCount: state.articles.pages,
    articles: state.articles.articles,
    comments: state.comments.comments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initArticles: (callback, page) => dispatch(getAllArticles(callback, page)),
    getComments: (id) => dispatch(getCommentsForArticle(id)),
    getautthorarticles: (id) => dispatch(getArticleByAuthor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
