import React, { Component } from "react";
import { getSingleArticle } from "../../store/actions/articleActions";
import {
  getCommentsForArticle,
  addComment,
} from "../../store/actions/commentActions";
import {
  Container,
  Typography,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  LinearProgress,
} from "@material-ui/core";
import { connect } from "react-redux";

class SingleArticle extends Component {
  state = {
    comment: "",
    isLoading: true,
    commentsLoading: true,
  };
  cb = () => this.setState({ commentsLoading: false });
  callback = () => {
    this.props.getComments(this.props.match.params.id, this.cb);
    this.setState({ comment: "", isLoading: false });
  };

  uef = () => {
    const articleId = this.props.match.params.id;
    this.props.getArticle(articleId, this.callback);
  };

  componentDidMount() {
    this.uef();
  }

  postComment = () => {
    const body = {
      author: this.props.username,
      comment: this.state.comment,
    };
    this.props.addComment(this.props.match.params.id, body, this.callback);
  };

  render() {
    return this.state.isLoading ? (
      <Container
        maxWidth={false}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    ) : (
      <Container>
        <Typography style={{ marginTop: 20 }} variant="h3">
          {this.props.article.title}
        </Typography>
        <Typography variant="body1">{this.props.article.body}</Typography>
        <Typography
          color="textSecondary"
          variant="body2"
          style={{ marginTop: 10 }}
        >
          -{this.props.article.author}
        </Typography>
        <hr />
        <Typography variant="h4">Comments</Typography>
        <CardContent>
          {this.state.commentsLoading ? (
            <LinearProgress />
          ) : this.props.comments.length ? (
            this.props.comments.map((item) => {
              return (
                <div key={item._id}>
                  <Typography variant="h6">{item.comment}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    - {item.author}
                  </Typography>
                </div>
              );
            })
          ) : (
            "no comments yet"
          )}
          <TextField
            type="text"
            onChange={(e) => this.setState({ comment: e.target.value })}
            fullWidth
            value={this.state.comment}
            style={{ paddingTop: 20, borderRadius: 0 }}
            placeholder="Write your comment here"
            multiline
            // rows={2}
            variant="standard"
          />
          <Button
            size="small"
            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            onClick={() => this.postComment()}
            color="primary"
            variant="contained"
          >
            Post Comment
          </Button>
        </CardContent>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.users.authenticatedUsername,
    article: state.articles.article,
    comments: state.comments.comments,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    getArticle: (id, callback) => dispatch(getSingleArticle(id, callback)),
    getComments: (id, cb) => dispatch(getCommentsForArticle(id, cb)),
    addComment: (articleId, body, callback) =>
      dispatch(addComment(articleId, body, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(SingleArticle);
