import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllArticles } from "../../store/actions/articleActions";
import { Container, Card, Typography, Button } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
class ArticlesComponent extends Component {
  componentDidMount = () => {
    this.props.initArticles();
  };

  render() {
    return (
      <Container>
        {this.props.articles.reverse().map((item) => {
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
                <Button size="small">- {item.author}</Button>
              </CardActions>
            </Card>
          );
        })}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles,
    auth: state.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initArticles: () => dispatch(getAllArticles()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesComponent);
