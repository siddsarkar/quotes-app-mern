import React, { Component } from "react";
import { connect } from "react-redux";
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
  Hidden,
  Grid,
  Container,
  Paper,
} from "@material-ui/core";
import { AccountCircle, Favorite } from "@material-ui/icons";

//actions
import {
  getLikesForArticle,
  likeArticle,
} from "../../store/actions/likesActions";
import {
  getCommentsForArticle,
  addComment,
} from "../../store/actions/commentActions";
import { getSingleArticle } from "../../store/actions/articleActions";

//components
import { BottomNav, MarkedDown, Loader, SideNav } from "../../components";

class SingleArticle extends Component {
  mounted = false;
  state = {
    comment: "",
    pageLoaded: false,
    likesLoading: true,
    commentsLoading: true,
    addCommentLoading: false,
  };

  likeCallback = () => {
    this.props.getLikers(this.props.match.params.id, this.getLikersCallback);
  };

  handleLike = () => {
    this.setState(this.setState({ likesLoading: true }), () => {
      this.props.like(this.props.article._id, this.likeCallback);
    });
  };
  getLikersCallback = () => {
    //server logic
    this.mounted && this.setState({ likesLoading: false });
  };

  getCommentsCallback = () => {
    this.mounted && this.setState({ commentsLoading: false });
  };

  articleCallback = () => {
    if (this.props.auth) {
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
    } else {
      this.setState(
        this.setState({
          pageLoaded: true,
          commentsLoading: true,
        }),
        () => {
          this.props.getComments(
            this.props.match.params.id,
            this.getCommentsCallback
          );
        }
      );
    }
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
    const { article, auth, likersNames, comments, isLiked } = this.props;
    const {
      addCommentLoading,
      comment,
      commentsLoading,
      likesLoading,
      pageLoaded,
    } = this.state;
    return pageLoaded ? (
      <>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid
            item
            md={2}
            sm={2}
            xs={false}
            style={{ position: "relative", backgroundColor: "#fafafa" }}
          >
            <Hidden xsDown>
              <SideNav isliked={isLiked} isBookMarked={false} />
            </Hidden>
          </Grid>
          <Grid elevation={0} component={Paper} item md={8} sm={10} xs={12}>
            <Container maxWidth="md" style={{ padding: 10 }}>
              <MarkedDown
                tags={article.tags}
                title={article.title}
                body={article.body}
                date={article.addedOn}
              />
            </Container>
            <CardActions>
              <Link
                style={{ textDecoration: "none" }}
                to={"/article/" + article.authorId + "/articles"}
              >
                <Button
                  color="primary"
                  style={{
                    textTransform: "none",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                >
                  <AccountCircle style={{ marginRight: 5 }} />
                  <Typography>{article.author}</Typography>
                </Button>
              </Link>
              <div style={{ flexGrow: 1 }} />
              {auth ? (
                <Button
                  disabled={likesLoading}
                  onClick={this.handleLike}
                  style={{ position: "relative" }}
                >
                  <Typography>{isLiked ? "unlike" : "like"}</Typography>
                </Button>
              ) : null}
              <Link
                style={{ textDecoration: "none" }}
                to={"/likes/" + article._id}
              >
                <Button>
                  <Favorite
                    color={auth && isLiked ? "secondary" : "primary"}
                    style={{ marginRight: 5 }}
                  />
                  <Typography>
                    {auth ? likersNames.length : article.likesCount}
                  </Typography>
                </Button>
              </Link>
            </CardActions>
            <Divider variant="middle" />
            <CardContent style={{ marginBottom: 0, paddingBottom: 0 }}>
              <Typography variant="h5">Comments</Typography>
              {commentsLoading && <LinearProgress />}
            </CardContent>
            {commentsLoading ? null : comments.length ? (
              comments.map((item) => {
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
                            {" - " +
                              item.addedOn.split(".")[0].split("T")[1] +
                              " - " +
                              item.addedOn.split(".")[0].split("T")[0]}
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

            {auth ? (
              <CardContent>
                <TextField
                  type="text"
                  onChange={(e) => this.setState({ comment: e.target.value })}
                  fullWidth
                  value={comment}
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
                  disabled={addCommentLoading}
                  onClick={this.postComment}
                  color="primary"
                  variant="contained"
                >
                  Post Comment
                  {addCommentLoading && (
                    <CircularProgress
                      size={24}
                      style={{ position: "absolute" }}
                    />
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
          </Grid>
          <Grid
            item
            md={2}
            sm={false}
            xs={false}
            style={{ backgroundColor: "#fafafa" }}
          />
        </Grid>

        <Hidden smUp>
          <div
            style={{
              position: "relative",
              width: "100%",
              bottom: 0,
              height: 80,
            }}
          />
          <BottomNav isliked={isLiked} />
        </Hidden>
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
    isLiked: state.likes.isLiked,
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
