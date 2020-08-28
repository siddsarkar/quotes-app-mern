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
import EditArticle from "./EditArticle";
class MyArticles extends Component {
  getArticles = () => {
    this.props.initMyArticles();
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
                    {item.title}
                  </Typography>
                  <Typography variant="h5" component="h2"></Typography>
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
    myArticles: state.articles.myArticles,
    auth: state.users.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initMyArticles: () => dispatch(getMyArticles()),
    deleteArticle: (id, callback) => dispatch(deleteArticle(id, callback)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyArticles);
