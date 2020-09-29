import React, { Component } from "react";
import { connect } from "react-redux";
import { getArticleByAuthor } from "../../store/actions/articleActions";
import { Container, Typography } from "@material-ui/core";
import MyCard from "../../components/Card";
import Loader from "../../components/Loader";
class AuthorArticles extends Component {
  mounted = false;
  state = {
    isloading: true,
  };

  gotArticles = () => {
    this.mounted && this.setState({ isloading: false });
  };

  uef = () => {
    const id = this.props.match.params.authorId;
    this.props.getautthorarticles(id, this.gotArticles);
  };
  componentDidMount = () => {
    this.mounted = true;
    this.uef();
  };

  componentWillUnmount = () => {
    this.mounted = false;
  };

  render() {
    const { articles } = this.props;
    return this.state.isloading ? (
      <Loader />
    ) : (
      <>
        <div style={{ margin: 10, textAlign: "center" }}>
          <Typography color="textSecondary" variant="caption">
            Showing articles by {this.props.match.params.authorId}
          </Typography>
        </div>
        <Container maxWidth="lg">
          {articles.map((item, index) => {
            return <MyCard key={item._id} item={item} />;
          })}
        </Container>
        <div style={{ margin: 10, textAlign: "center" }}>
          <Typography color="textSecondary" variant="caption">
            Copyright@2020_Siddhartha Sarkar
          </Typography>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthorArticles);
