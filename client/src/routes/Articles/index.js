import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllArticles } from "../../store/actions/articleActions";
import { getCommentsForArticle } from "../../store/actions/commentActions";
import { Container } from "@material-ui/core";
import MyCard from "../../components/Card";
class Articles extends Component {
  state = {
    articles: [],
  };

  gotArticles = () => {
    this.setState({ articles: this.props.articles });
  };
  componentDidMount = () => {
    this.props.initArticles(this.gotArticles);
  };

  commentsHandler = (id, index) => {
    this.props.getComments(id);
    const articles = this.state.articles.map((item, j) => {
      if (j === index) {
        return {
          ...item,
          comments: this.props.comments,
        };
      } else {
        return item;
      }
    });
    console.log(articles);
    this.setState({ articles: articles });
    this.setState({ isCommentOn: true });
  };

  render() {
    return (
      <Container maxWidth="lg">
        {this.state.articles.map((item, index) => {
          return <MyCard item={item} />;
        })}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles,
    comments: state.comments.comments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initArticles: (callback) => dispatch(getAllArticles(callback)),
    getComments: (id) => dispatch(getCommentsForArticle(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
