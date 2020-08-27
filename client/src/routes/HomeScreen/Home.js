import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllArticles } from "../../store/actions/articleActions";
import { getCommentsForArticle } from "../../store/actions/commentActions";
import { Container, Card, Typography, Button } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
class ArticlesComponent extends Component {
  state = {
    isCommentOn: false,
    articles: [],
  };

  gotArticles = () => {
    this.setState({ articles: this.props.articles });
  };
  componentDidMount = () => {
    this.props.initArticles(this.gotArticles);
  };

  // commentsHandler = (id, index) => {
  //   this.props.getComments(id);
  //   const articles = this.state.articles.map((item, j) => {
  //     if (j === index) {
  //       return {
  //         ...item,
  //         comments: this.props.comments,
  //       };
  //     } else {
  //       return item;
  //     }
  //   });
  //   console.log(articles);
  //   this.setState({ articles: articles });
  //   this.setState({ isCommentOn: true });
  // };

  render() {
    return (
      <Container>
        {this.state.articles.map((item, index) => {
          return (
            <Card key={item._id} style={{ margin: 10 }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {item.body}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">- {item.author}</Button>
                <Button
                  onClick={() => this.commentsHandler(item._id, index)}
                  size="small"
                  variant="outlined"
                >
                  Comments
                </Button>
              </CardActions>
              <CardContent style={{ marginLeft: 20 }}>
                <Typography variant="body2" component="p">
                  im a comment
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  gutterBottom
                >
                  -by me
                </Typography>
              </CardContent>
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
    comments: state.comments.comments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initArticles: (callback) => dispatch(getAllArticles(callback)),
    getComments: (id) => dispatch(getCommentsForArticle(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesComponent);
