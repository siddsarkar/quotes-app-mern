import React, { Component } from "react";
import { getSingleArticle } from "../../store/actions/articleActions";
import {
  getCommentsForArticle,
  addComment,
} from "../../store/actions/commentActions";
import {
  Container,
  Typography,
  CardContent,
  TextField,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";

class SingleArticle extends Component {
  state = {
    comment: "",
  };
  callback = () => {
    this.props.getComments(this.props.match.params.id);
    this.setState({ comment: "" });
  };

  uef = () => {
    const articleId = this.props.match.params.id;
    this.props.getArticle(articleId, this.callback);
  };

  componentDidMount() {
    this.uef();
  }

  postComment = () => {
    const body = {
      author: this.props.article.author,
      comment: this.state.comment,
    };
    this.props.addComment(this.props.match.params.id, body, this.callback);
  };

  render() {
    return (
      <Container>
        <Typography variant="h3">{this.props.article.title}</Typography>
        <Typography variant="body1">{this.props.article.body}</Typography>
        <Typography
          color="textSecondary"
          variant="body2"
          style={{ marginTop: 10 }}
        >
          -{this.props.article.author}
        </Typography>
        <hr />
        <Typography variant="h4">Comments</Typography>
        <CardContent>
          {this.props.comments.length
            ? this.props.comments.map((item) => {
                return (
                  <div key={item._id}>
                    <Typography variant="h6">{item.comment}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      - {item.author}
                    </Typography>
                  </div>
                );
              })
            : "no comments yet"}
          <TextField
            type="text"
            onChange={(e) => this.setState({ comment: e.target.value })}
            fullWidth
            value={this.state.comment}
            style={{ paddingTop: 20, borderRadius: 0 }}
            placeholder="Write your comment here"
            multiline
            // rows={2}
            variant="standard"
          />
          <Button
            size="small"
            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            onClick={() => this.postComment()}
            color="primary"
            variant="contained"
          >
            Post Comment
          </Button>
        </CardContent>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    article: state.articles.article,
    comments: state.comments.comments,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    getArticle: (id, callback) => dispatch(getSingleArticle(id, callback)),
    getComments: (id) => dispatch(getCommentsForArticle(id)),
    addComment: (articleId, body, callback) =>
      dispatch(addComment(articleId, body, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(SingleArticle);
