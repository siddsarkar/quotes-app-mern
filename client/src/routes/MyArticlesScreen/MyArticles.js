import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getMyArticles,
  deleteArticle,
} from "../../store/actions/articleActions";
import { Container, Card, Typography, Button } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
class MyArticlesComponent extends Component {
  componentDidMount() {
    this.props.initMyArticles();
  }
  render() {
    return this.props.auth ? (
      <Router>
        <Container>
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
                  <Button variant="outlined" size="small">
                    EDIT
                  </Button>

                  <Button
                    size="small"
                    onClick={() => this.props.deleteArticle(item._id)}
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

const EditComponent = () => {
  return <div>hi</div>;
};

const mapStateToProps = (state) => {
  return {
    myArticles: state.articles.myArticles,
    auth: state.users.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initMyArticles: () => dispatch(getMyArticles()),
    deleteArticle: (id) => dispatch(deleteArticle(id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyArticlesComponent);
