import React, { Component } from "react";
import { connect } from "react-redux";
import { getArticleByAuthor } from "../../store/actions/articleActions";
import { Container, Typography } from "@material-ui/core";
import MyCard from "../../components/Card";
import Loader from "../../components/Loader";
class Articles extends Component {
  state = {
    articles: [],
    isloading: true,
  };

  gotArticles = () => {
    this.setState({ articles: this.props.articles, isloading: false });
  };

  uef = () => {
    const id = this.props.match.params.authorId;
    this.props.getautthorarticles(id, this.gotArticles);
  };
  componentDidMount = () => {
    this.uef();
  };

  render() {
    return this.state.isloading ? (
      <Loader />
    ) : (
      <div
        style={{
          position: "relative",
          height: "100%",
        }}
      >
        <div style={{ margin: 10, textAlign: "center" }}>
          <Typography color="textSecondary" variant="caption">
            Showing articles by {this.props.match.params.authorId}
          </Typography>
        </div>
        <Container maxWidth="lg">
          {this.state.articles.map((item, index) => {
            return <MyCard key={item._id} item={item} />;
          })}
        </Container>
        <div style={{ margin: 10, textAlign: "center" }}>
          <Typography color="textSecondary" variant="caption">
            Copyright@2020_Siddhartha Sarkar
          </Typography>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getautthorarticles: (id, cb) => dispatch(getArticleByAuthor(id, cb)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
