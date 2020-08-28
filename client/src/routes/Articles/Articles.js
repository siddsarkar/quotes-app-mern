import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllArticles } from "../../store/actions/articleActions";
import { getCommentsForArticle } from "../../store/actions/commentActions";
import { Container, Card, Typography, Button } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
class Articles extends Component {
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

  commentsHandler = (id, index) => {
    this.props.getComments(id);
    const articles = this.state.articles.map((item, j) => {
      if (j === index) {
        return {
          ...item,
          comments: this.props.comments,
        };
      } else {
        return item;
      }
    });
    console.log(articles);
    this.setState({ articles: articles });
    this.setState({ isCommentOn: true });
  };

  render() {
    const comments = this.props.comments.map((item) => {
      return (
        <CardContent
          style={{
            padding: 10,
            marginLeft: 20,
            backgroundColor: "lightblue",
          }}
        >
          <Typography variant="body2" component="p">
            {item.comment}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            -{item.author}
          </Typography>
        </CardContent>
      );
    });
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
              {this.state.isCommentOn ? comments : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
