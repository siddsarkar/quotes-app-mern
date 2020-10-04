import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Typography } from "@material-ui/core";

//components
import { MyCard, Loader } from "../../components";

//actions
import { getArticleByAuthor } from "../../store/actions/articleActions";

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
    const { isloading } = this.state;
    const authorId = this.props.match.params.authorId;

    return isloading ? (
      <Loader />
    ) : (
      <>
        <div style={{ margin: 10, textAlign: "center" }}>
          <Typography color="textSecondary" variant="caption">
            Showing articles by {authorId}
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
