import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getMyArticles,
  deleteArticle,
} from "../../store/actions/articleActions";
import {
  Container,
  Card,
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Tab,
  Tabs,
  LinearProgress,
  Divider,
  Paper,
  CircularProgress,
  AppBar,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EditArticle from "./edit/EditArticle";
import {
  getMyComments,
  deleteComment,
} from "../../store/actions/commentActions";
import { getMyLikes } from "../../store/actions/likesActions";
import Loader from "../../components/Loader";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container maxWidth="md" style={{ padding: 10 }}>
          {children}
        </Container>
      )}
    </div>
  );
}
class MyArticles extends Component {
  mounted = false;
  state = {
    commentsLoading: true,
    likesLoading: true,
    postLoading: true,
    value: 0,
  };
  getMylikesCallback = () =>
    this.mounted && this.setState({ likesLoading: false });

  getMyCommentsCallback = () =>
    this.mounted && this.setState({ commentsLoading: false });

  getArticles = () => {
    this.mounted && this.setState({ postLoading: false });
    this.props.getMyComments(this.getMyCommentsCallback);
    this.props.getMylikes(this.getMylikesCallback);
  };
  componentDidMount() {
    this.mounted = true;
    this.props.initMyArticles(this.getArticles);
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  render() {
    const { likes } = this.props;
    return this.props.auth ? (
      <>
        <AppBar position="sticky" style={{ backgroundColor: "white" }}>
          <Tabs
            value={this.state.value}
            onChange={(e, v) => this.setState({ value: v })}
            indicatorColor="secondary"
            textColor="secondary"
            centered
          >
            <Tab label="Posts" />
            <Tab label="Comments" />
            <Tab label="Likes" />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          {/* posts */}
          {this.state.postLoading ? (
            <Loader />
          ) : (
            <Router>
              <Switch>
                <Route
                  path="/edit/:id"
                  render={(props) => (
                    <EditArticle
                      getArticles={() => this.getArticles()}
                      {...props}
                    />
                  )}
                />
              </Switch>
              {this.props.myArticles.map((item) => {
                return (
                  <Card
                    elevation={5}
                    key={item._id}
                    style={{ backgroundColor: "azure", marginBottom: 10 }}
                  >
                    <CardContent>
                      <Typography variant="body2" color="textSecondary">
                        {item.addedOn.split(".")[0].split("T")[0] +
                          " - " +
                          item.addedOn.split(".")[0].split("T")[1]}
                      </Typography>
                      <Typography variant="h5" color="textPrimary" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body2">{item.body}</Typography>
                    </CardContent>
                    <CardActions style={{ paddingTop: 0 }}>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/edit/" + item._id}
                      >
                        <Button
                          variant="contained"
                          disableElevation
                          size="small"
                        >
                          EDIT
                        </Button>
                      </Link>
                      <Button
                        size="small"
                        onClick={() =>
                          this.props.deleteArticle(item._id, this.getArticles)
                        }
                      >
                        <Typography color="textSecondary">DELETE</Typography>
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
            </Router>
          )}
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          {/* comments */}
          {this.state.commentsLoading ? (
            <Loader />
          ) : this.props.myComments.length ? (
            this.props.myComments.map((comment) => {
              return (
                <Card
                  elevation={5}
                  key={comment._id}
                  style={{ backgroundColor: "lightcyan", marginBottom: 10 }}
                >
                  <CardContent>
                    <Typography
                      variant="body2"
                      gutterBottom
                      color="textSecondary"
                    >
                      {comment.addedOn.split(".")[0].split("T")[0] +
                        " - " +
                        comment.addedOn.split(".")[0].split("T")[1]}
                    </Typography>
                    <Typography variant="h6" color="textPrimary">
                      {comment.comment}
                    </Typography>
                  </CardContent>
                  <CardActions style={{ paddingTop: 0 }}>
                    <Button
                      variant="contained"
                      disableElevation
                      size="small"
                      onClick={() =>
                        this.props.deleteComment(comment._id, this.getArticles)
                      }
                    >
                      <Typography color="textSecondary">DELETE</Typography>
                    </Button>
                  </CardActions>
                </Card>
              );
            })
          ) : null}
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          {/* likes */}
          <List>
            {this.state.likesLoading ? (
              <Loader />
            ) : (
              likes.map((value) => {
                return (
                  <Link
                    key={value.articleId}
                    style={{ textDecoration: "none" }}
                    to={"/article/" + value.articleId}
                  >
                    <ListItem button>
                      <ListItemAvatar>
                        <AccountCircle color="secondary" />
                      </ListItemAvatar>
                      <ListItemText>
                        <Typography color="textPrimary">
                          {value.articleId}
                        </Typography>
                      </ListItemText>
                      <ListItemSecondaryAction>
                        <Typography variant="caption" color="textSecondary">
                          {value.addedOn.split(".")[0].split("T")[0]}
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </Link>
                );
              })
            )}
          </List>
        </TabPanel>
      </>
    ) : (
      <Container
        style={{
          padding: 20,
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h3">
          Please login/sign-up to view your quotes
        </Typography>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myComments: state.comments.myComments,
    myArticles: state.articles.myArticles,
    auth: state.users.isAuthenticated,
    userId: state.users.userId,
    likes: state.likes.myLikes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMylikes: (cb) => dispatch(getMyLikes(cb)),
    initMyArticles: (cb) => dispatch(getMyArticles(cb)),
    getMyComments: (cb) => dispatch(getMyComments(cb)),
    deleteArticle: (id, callback) => dispatch(deleteArticle(id, callback)),
    deleteComment: (id, callback) => dispatch(deleteComment(id, callback)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyArticles);
