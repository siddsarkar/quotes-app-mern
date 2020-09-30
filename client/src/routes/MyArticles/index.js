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
import Loader from "../../components/Loader";
import { getMyLikes } from "../../store/actions/likesActions";

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
      {value === index && <Container>{children}</Container>}
    </div>
  );
}
class MyArticles extends Component {
  state = {
    isloading: true,
    likesLoading: true,
    postLoading: true,
    value: 0,
  };
  callback = () => {
    this.setState({ likesLoading: false });
  };
  cb = () => this.setState({ isloading: false });
  getArticles = () => {
    this.setState({ postLoading: false });
    this.props.getMyComments(this.cb);
    this.props.getMylikes(this.callback);
  };
  componentDidMount() {
    this.props.initMyArticles(this.getArticles);
  }
  render() {
    const { likes } = this.props;
    return this.props.auth ? (
      <Container maxWidth="md">
        <Tabs
          value={this.state.value}
          onChange={(e, v) => this.setState({ value: v })}
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
          <Tab label="Posts" />
          <Tab label="Likes" />
          <Tab label="Comments" />
        </Tabs>
        <TabPanel value={this.state.value} index={0}>
          {/* posts */}
          {this.state.postLoading ? (
            <LinearProgress />
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
                    key={item._id}
                    style={{ backgroundColor: "azure", margin: 10 }}
                  >
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        [Post@{item.addedOn}] {item.title}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {item.body}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/edit/" + item._id}
                      >
                        <Button variant="outlined" size="small">
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
                          {value.authorId}
                        </Typography>
                      </ListItemText>
                      <ListItemSecondaryAction>
                        <Typography variant="caption" color="textSecondary">
                          {Date(value.addedOn).substring(0, 10)}
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Link>
                );
              })
            )}
          </List>
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          {/* comments */}
          {this.state.postLoading ? (
            <Loader />
          ) : this.props.myComments.length ? (
            this.props.myComments.map((comment) => {
              return (
                <Card
                  key={comment._id}
                  style={{ backgroundColor: "beige", margin: 10 }}
                >
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      [Comment@{comment.addedOn}]
                    </Typography>
                    <Typography variant="body2" component="p">
                      {comment.comment}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
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
      </Container>
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
