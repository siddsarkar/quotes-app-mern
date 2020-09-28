import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getMyArticles,
  deleteArticle,
} from "../../store/actions/articleActions";
import { Container, Card, Typography, Button } from "@material-ui/core";
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
class MyArticles extends Component {
  state = {
    isloading: true,
  };
  callback = () => {
    console.log("Got likes, To implement Its deletion");
  };
  cb = () => this.setState({ isloading: false });
  getArticles = () => {
    this.props.getMyComments(this.cb);
    this.props.getMylikes(this.callback);
  };
  componentDidMount() {
    this.props.initMyArticles(this.getArticles);
  }
  render() {
    return this.props.auth ? (
      this.state.isloading ? (
        <Loader />
      ) : (
        <Router>
          <Container>
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
            {/* posts */}
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
            {/* comments */}
            {this.props.myComments.length
              ? this.props.myComments.map((comment) => {
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
                            this.props.deleteComment(
                              comment._id,
                              this.getArticles
                            )
                          }
                        >
                          <Typography color="textSecondary">DELETE</Typography>
                        </Button>
                      </CardActions>
                    </Card>
                  );
                })
              : null}
          </Container>
        </Router>
      )
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
