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
  CardActions,
} from "@material-ui/core";
import { connect } from "react-redux";
import Loader from "../../components/Loader";
import { AccountCircle, Favorite } from "@material-ui/icons";
import {
  getLikesForArticle,
  likeArticle,
} from "../../store/actions/likesActions";

class SingleArticle extends Component {
  state = {
    comment: "",
    isLoading: true,
    commentsLoading: true,
    likers: [],
    likersLoading: true,
    isliked: false,
  };

  likeCallback = () => {
    this.setState({ isliked: !this.state.isliked });
    this.props.likers(this.props.match.params.id, this.likersCb);
  };
  likersCb = () => {
    this.setState(
      this.setState({ likers: this.props.likersNames, likersLoading: false }),
      () => {
        for (let i = 0; i < this.state.likers.length; i++) {
          if (this.state.likers[i].authorId === this.props.userId) {
            this.setState({ isliked: true });
          }
        }
      }
    );
  };
  cb = () => {
    this.setState({ commentsLoading: false });
    this.props.likers(this.props.match.params.id, this.likersCb);
  };

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
        <Typography style={{ marginTop: 20 }} variant="h3" gutterBottom>
          {this.props.article.title}
        </Typography>
        <Typography variant="body1" style={{ marginLeft: 5 }} gutterBottom>
          {this.props.article.body}
        </Typography>
        <CardActions>
          <Link
            style={{ textDecoration: "none" }}
            to={"/article/" + this.props.article.authorId + "/articles"}
          >
            <Button
              color="primary"
              style={{ textTransform: "none", marginTop: 5, marginBottom: 5 }}
            >
              <AccountCircle style={{ marginRight: 5 }} />
              <Typography>{this.props.article.author}</Typography>
            </Button>
          </Link>
          <div style={{ flexGrow: 1 }} />
          <Button
            onClick={() =>
              this.props.like(this.props.article._id, this.likeCallback)
            }
          >
            <Typography>{this.state.isliked ? "Unlike" : "like"}</Typography>
          </Button>
          <Link
            style={{ textDecoration: "none" }}
            to={"/likes/" + this.props.article._id}
          >
            <Button>
              <Favorite style={{ marginRight: 5 }} />
              <Typography>{this.state.likers.length}</Typography>
            </Button>
          </Link>
        </CardActions>

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
            <Typography variant="body1">no comments yet</Typography>
          )}
        </CardContent>
        {this.props.auth ? (
          <CardContent>
            <TextField
              type="text"
              onChange={(e) => this.setState({ comment: e.target.value })}
              fullWidth
              value={this.state.comment}
              // style={{ paddingTop: 20, borderRadius: 0 }}
              placeholder="Write your comment here"
              multiline
              // rows={2}
              variant="standard"
            />
            <Button
              size="medium"
              style={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
              onClick={() => this.postComment()}
              color="primary"
              variant="contained"
            >
              Post Comment
            </Button>
          </CardContent>
        ) : (
          <CardContent>
            <Typography
              color="textSecondary"
              variant="body1"
              style={{ textAlign: "center" }}
            >
              Login to Write a comment
            </Typography>
          </CardContent>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    likersNames: state.likes.likes,
    username: state.users.authenticatedUsername,
    article: state.articles.article,
    comments: state.comments.comments,
    auth: state.users.isAuthenticated,
    userId: state.users.userId,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    getArticle: (id, callback) => dispatch(getSingleArticle(id, callback)),
    getComments: (id, cb) => dispatch(getCommentsForArticle(id, cb)),
    addComment: (articleId, body, callback) =>
      dispatch(addComment(articleId, body, callback)),
    likers: (id, cb) => dispatch(getLikesForArticle(id, cb)),
    like: (id, cb) => dispatch(likeArticle(id, cb)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(SingleArticle);
