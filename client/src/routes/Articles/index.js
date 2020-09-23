import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllArticles,
  getArticleByAuthor,
} from "../../store/actions/articleActions";
import { getCommentsForArticle } from "../../store/actions/commentActions";
import { Container, Typography } from "@material-ui/core";
import MyCard from "../../components/Card";
import Loader from "../../components/Loader";
class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
  };

  gotArticles = () => {
    this.setState({ articles: this.props.articles, isLoading: false });
  };
  componentDidMount = () => {
    this.props.initArticles(this.gotArticles);
  };

  render() {
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <Container
        maxWidth={false}
        style={{
          position: "relative",
          height: "100%",
          borderRadius: 0,
        }}
      >
        <Container maxWidth="md" style={{ padding: 10 }}>
          {this.state.articles.map((item, index) => {
            return <MyCard key={item._id} item={item} />;
          })}
        </Container>
        <div style={{ margin: 10, textAlign: "center" }}>
          <Typography color="textSecondary" variant="caption">
            Copyright@2020_Siddhartha Sarkar
          </Typography>
        </div>
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
    getautthorarticles: (id) => dispatch(getArticleByAuthor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
