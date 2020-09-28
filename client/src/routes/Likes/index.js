import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../../components/Loader";
import { getLikesForArticle } from "../../store/actions/likesActions";
import { Typography } from "@material-ui/core";

class LikesPage extends Component {
  state = {
    loading: true,
    likes: [],
  };
  cb = () => {
    this.setState({ loading: false, likes: this.props.likes });
  };
  uef = () => {
    const articleId = this.props.match.params.id;
    this.props.likers(articleId, this.cb);
  };

  componentDidMount = () => {
    this.uef();
  };
  render() {
    return this.state.loading ? (
      <Loader />
    ) : (
      <>
        <Typography variant="h3">Liked By: </Typography>
        {this.state.likes.map((item) => (
          <Typography key={item.authorId}>{item.authorId}</Typography>
        ))}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  likes: state.likes.likes,
});

const mapDispatchToprops = (dispatch) => {
  return {
    likers: (id, cb) => dispatch(getLikesForArticle(id, cb)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(LikesPage);
