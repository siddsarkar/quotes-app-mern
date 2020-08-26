import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, TextField, Typography, Button } from "@material-ui/core";
import {
  updateArticle,
  getSingleArticle,
} from "../../store/actions/articleActions";

class EditArticle extends Component {
  state = {
    body: "",
    title: "",
    author: "",
  };
  getFields = () => {
    this.setState({
      body: this.props.article.body,
      title: this.props.article.title,
      author: this.props.article.author,
    });
  };
  componentDidMount() {
    this.props.getSingle(this.props.match.params.id);
    setTimeout(() => {
      this.getFields();
    }, 1000);
  }
  updateArticle = () => {
    const article = {
      author: this.state.author,
      body: this.state.body,
      title: this.state.title,
    };
    this.props.updateArticle(this.props.match.params.id, article);
  };
  render() {
    return (
      <Container style={{ padding: 20 }}>
        <Typography style={{ padding: 20, paddingLeft: 0 }} variant="h3">
          Write Your Quote
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            style={{ marginBottom: 20 }}
            fullWidth
            value={this.state.author}
            id="standard-basic"
            placeholder="Author"
            disabled
          />
          <br />
          <TextField
            type="text"
            value={this.state.title}
            style={{ marginBottom: 20 }}
            fullWidth
            onChange={(e) => {
              this.setState({ title: e.target.value });
            }}
            placeholder="Title"
          />
          <br />
          <TextField
            type="text"
            value={this.state.body}
            onChange={(e) => {
              this.setState({ body: e.target.value });
            }}
            fullWidth
            placeholder="Body"
            // id="outlined-multiline-static"
            // label="Body"
            multiline
            rows={4}
            variant="outlined"
          />
          <br />
          <div style={{ padding: 20, paddingLeft: 0 }}>
            <Button variant="outlined" onClick={() => this.updateArticle()}>
              Submit
            </Button>
          </div>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    article: state.articles.article,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingle: (id) => dispatch(getSingleArticle(id)),
    updateArticle: (id, article) => dispatch(updateArticle(id, article)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
