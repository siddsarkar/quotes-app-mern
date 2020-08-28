import React, { Component } from "./node_modules/react";
import { connect } from "./node_modules/react-redux";
import {
  getMyArticles,
  deleteArticle,
} from "../../store/actions/articleActions";
import {
  Container,
  Card,
  Typography,
  Button,
} from "./node_modules/@material-ui/core";
import CardActions from "./node_modules/@material-ui/core/CardActions";
import CardContent from "./node_modules/@material-ui/core/CardContent";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "./node_modules/react-router-dom";
import EditArticle from "./EditArticle";
import {
  getMyComments,
  deleteComment,
} from "../../store/actions/commentActions";
class MyArticles extends Component {
  getArticles = () => {
    this.props.initMyArticles();
    this.props.getMyComments();
  };
  componentDidMount() {
    this.getArticles();
  }
  render() {
    return this.props.auth ? (
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
          {this.props.myArticles.map((item) => {
            return (
              <Card key={item._id} style={{ margin: 10 }}>
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
                  <Card key={comment._id} style={{ margin: 10 }}>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initMyArticles: () => dispatch(getMyArticles()),
    deleteArticle: (id, callback) => dispatch(deleteArticle(id, callback)),
    getMyComments: (callback) => dispatch(getMyComments(callback)),
    deleteComment: (id, callback) => dispatch(deleteComment(id, callback)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyArticles);
