import React, { Component } from "react";
import { getSingleArticle } from "../../store/actions/articleActions";
import { Link } from "react-router-dom";
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
  LinearProgress,
  Divider,
  Grid,
  Paper,
} from "@material-ui/core";
import { connect } from "react-redux";
import Loader from "../../components/Loader";
import { AccountCircle } from "@material-ui/icons";

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
      <Loader />
    ) : (
      <Container>
        <Typography style={{ marginTop: 20 }} variant="h3">
          {this.props.article.title}
        </Typography>
        <Typography variant="body1" style={{ marginLeft: 5 }}>
          {this.props.article.body}
        </Typography>
        <Link
          style={{ textDecoration: "none" }}
          to={"/article/" + this.props.article.authorId + "/articles"}
        >
          <Button
            color="primary"
            size="small"
            style={{ textTransform: "none", marginTop: 5, marginBottom: 5 }}
          >
            <AccountCircle fontSize="small" style={{ marginRight: 2 }} />
            <Typography variant="caption" color="primary">
              {this.props.article.author}
            </Typography>
          </Button>
        </Link>
        <Divider />
        <Typography variant="h4">Comments</Typography>
        <CardContent>
          {this.state.commentsLoading ? (
            <LinearProgress />
          ) : this.props.comments.length ? (
            this.props.comments.map((item) => {
              return (
                <Grid spacing={3} container key={item._id}>
                  <Grid item>
                    <Paper style={{ padding: 5 }}>
                      <Typography
                        color="textPrimary"
                        variant="h6"
                        style={{ marginLeft: 10, marginRight: 10 }}
                      >
                        {item.comment}
                      </Typography>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/article/" + item.authorId + "/articles"}
                      >
                        <Button style={{ textTransform: "none" }}>
                          <AccountCircle
                            fontSize="small"
                            style={{ marginRight: 2 }}
                          />
                          <Typography variant="caption" color="textSecondary">
                            {item.author}
                          </Typography>
                        </Button>
                      </Link>
                    </Paper>
                  </Grid>
                </Grid>
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
