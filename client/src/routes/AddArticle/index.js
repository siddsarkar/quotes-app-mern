import React, { Component } from "react";
import { connect } from "react-redux";
import { addArticle } from "../../store/actions/articleActions";
import { Container, TextField, Typography, Button } from "@material-ui/core";

class AddArticleScreen extends Component {
  state = {
    author: "",
    body: "",
    title: "",
  };

  getAuthorname = () => {
    this.setState({ author: this.props.authenticatedUsername });
  };

  componentDidMount() {
    this.getAuthorname();
  }
  addArticle = () => {
    const article = {
      author: this.state.author,
      body: this.state.body,
      title: this.state.title,
    };
    this.props.addArticle(article, () => {
      this.setState({
        body: "",
        title: "",
      });
    });
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
            label="Author"
            disabled
          />
          <br />
          <TextField
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
            value={this.state.body}
            onChange={(e) => {
              this.setState({ body: e.target.value });
            }}
            fullWidth
            placeholder="Body"
            multiline
            rows={4}
            variant="outlined"
          />
          <br />
          <div style={{ padding: 20, paddingLeft: 0 }}>
            <Button variant="outlined" onClick={() => this.addArticle()}>
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
    authenticatedUsername: state.users.authenticatedUsername,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addArticle: (article, callback) => dispatch(addArticle(article, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddArticleScreen);
