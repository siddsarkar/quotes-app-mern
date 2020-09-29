import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  CardContent,
  TextField,
  Button,
  LinearProgress,
  Divider,
  CardActions,
  CircularProgress,
  List,
  ListItemText,
  ListItemAvatar,
  ListItem,
  Avatar,
} from "@material-ui/core";
import { connect } from "react-redux";
import Loader from "../../components/Loader";
import { AccountCircle, Favorite } from "@material-ui/icons";

import {
  getLikesForArticle,
  likeArticle,
} from "../../store/actions/likesActions";
import {
  getCommentsForArticle,
  addComment,
} from "../../store/actions/commentActions";
import { getSingleArticle } from "../../store/actions/articleActions";

class SingleArticle extends Component {
  mounted = false;
  state = {
    comment: "",
    pageLoaded: false,
    likesLoading: true,
    isLiked: false,
    commentsLoading: true,
    addCommentLoading: false,
  };

  likeCallback = () => {
    this.setState({ isLiked: !this.state.isliked });
  };
  getLikersCallback = () => {
    for (let i = 0; i < this.props.likersNames.length; i++) {
      if (this.props.likersNames[i].authorId === this.props.userId) {
        this.mounted && this.setState({ isLiked: true, likesLoading: false });
      }
    }
    this.mounted && this.setState({ likesLoading: false });
  };

  getCommentsCallback = () => {
    this.mounted && this.setState({ commentsLoading: false });
  };

  articleCallback = () => {
    this.mounted &&
      this.setState(
        this.setState({
          pageLoaded: true,
          likesLoading: true,
          commentsLoading: true,
        }),
        () => {
          this.props.getLikers(
            this.props.match.params.id,
            this.getLikersCallback
          );
          this.props.getComments(
            this.props.match.params.id,
            this.getCommentsCallback
          );
        }
      );
  };

  addCommentCallback = () => {
    this.mounted && this.setState({ addCommentLoading: false, comment: "" });
    this.props.getComments(
      this.props.match.params.id,
      this.getCommentsCallback
    );
  };

  componentDidMount() {
    this.mounted = true;
    const articleId = this.props.match.params.id;
    this.props.getArticle(articleId, this.articleCallback);
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  postComment = () => {
    const body = {
      author: this.props.username,
      comment: this.state.comment,
    };
    this.mounted &&
      this.setState(this.setState({ addCommentLoading: true }), () => {
        this.props.addComment(
          this.props.match.params.id,
          body,
          this.addCommentCallback
        );
      });
  };

  render() {
    const { article } = this.props;
    return this.state.pageLoaded ? (
      <>
        <CardContent>
          <Typography color="textPrimary" variant="h3" gutterBottom>
            {article.title}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {article.body}
          </Typography>
        </CardContent>
        <CardActions>
          <Link
            style={{ textDecoration: "none" }}
            to={"/article/" + article.authorId + "/articles"}
          >
            <Button
              color="primary"
              style={{ textTransform: "none", marginTop: 5, marginBottom: 5 }}
            >
              <AccountCircle style={{ marginRight: 5 }} />
              <Typography>{article.author}</Typography>
            </Button>
          </Link>
          <div style={{ flexGrow: 1 }} />
          {this.props.auth ? (
            <Button
              disableElevation
              disabled={this.state.likesLoading}
              variant="contained"
              onClick={() => this.props.like(article._id, this.likeCallback)}
              style={{ position: "relative" }}
            >
              {this.state.likesLoading && (
                <CircularProgress size={24} style={{ position: "absolute" }} />
              )}
              <Typography>{this.state.isLiked ? "unlike" : "like"}</Typography>
            </Button>
          ) : null}
          <Link style={{ textDecoration: "none" }} to={"/likes/" + article._id}>
            <Button>
              <Favorite style={{ marginRight: 5 }} />
              <Typography>{this.props.likersNames.length}</Typography>
            </Button>
          </Link>
        </CardActions>
        <Divider variant="middle" />
        <CardContent style={{ marginBottom: 0, paddingBottom: 0 }}>
          <Typography variant="h5">Comments</Typography>
          {this.state.commentsLoading && <LinearProgress />}
        </CardContent>
        {this.state.commentsLoading ? null : this.props.comments.length ? (
          this.props.comments.map((item) => {
            return (
              <List key={item._id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={"/article/" + item.authorId + "/articles"}
                    >
                      <Avatar>{item.author[0].toUpperCase()}</Avatar>
                    </Link>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.comment}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {item.author}
                        </Typography>{" "}
                        {" - " + Date(item.addedOn).substring(0, 10)}
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            );
          })
        ) : (
          <CardContent>
            <Typography color="textSecondary">No comments yet!</Typography>
          </CardContent>
        )}

        {this.props.auth ? (
          <CardContent>
            <TextField
              type="text"
              onChange={(e) => this.setState({ comment: e.target.value })}
              fullWidth
              value={this.state.comment}
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
                position: "relative",
              }}
              disabled={this.state.addCommentLoading}
              onClick={() => this.state.comment && this.postComment()}
              color="primary"
              variant="contained"
            >
              Post Comment
              {this.state.addCommentLoading && (
                <CircularProgress size={24} style={{ position: "absolute" }} />
              )}
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
      </>
    ) : (
      <Loader />
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
    getLikers: (id, cb) => dispatch(getLikesForArticle(id, cb)),
    like: (id, cb) => dispatch(likeArticle(id, cb)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(SingleArticle);
