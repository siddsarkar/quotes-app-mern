import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Container, TextField, Typography, Button } from "@material-ui/core";

//actions
import {
  updateArticle,
  getSingleArticle,
} from "../../../store/actions/articleActions";
//utils
import TabPanel from "../../../utils/TabPanel";
//components
import { MarkedDown } from "../../../components";

class EditArticle extends Component {
  mounted = false;
  state = {
    body: "",
    title: "",
    author: "",
    disabled: true,
    value: 0,
  };

  getFields = () => {
    const { body, title, author } = this.props.article;
    this.mounted && this.setState({ body, title, author, disabled: false });
  };

  componentDidMount() {
    this.mounted = true;
    this.props.getSingle(this.props.match.params.id, this.getFields);
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  updateArticle = () => {
    const { body, title, author } = this.state;
    const article = { body, title, author };
    this.props.updateArticle(this.props.match.params.id, article);
    this.props.getArticles();
  };

  render() {
    const { addedOn } = this.props.article;
    const { body, author, title, disabled, value } = this.state;
    return (
      <>
        <TabPanel value={value} index={0}>
          <Container style={{ padding: 20 }}>
            <Typography style={{ padding: 20, paddingLeft: 0 }} variant="h3">
              Edit Your Quote
            </Typography>
            <form noValidate autoComplete="off">
              <TextField
                style={{ marginBottom: 20 }}
                fullWidth
                value={author}
                id="standard-basic"
                placeholder="Author"
                disabled
              />
              <br />
              <TextField
                disabled={disabled}
                type="text"
                value={title}
                style={{ marginBottom: 20 }}
                fullWidth
                onChange={(e) => {
                  this.setState({ title: e.target.value });
                }}
                placeholder="Title"
              />
              <br />
              <TextField
                disabled={disabled}
                type="text"
                value={body}
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
            </form>
          </Container>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MarkedDown
            body={body}
            title={title}
            date={addedOn}
            tags={this.props.article.tags}
          />
        </TabPanel>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Button
            disabled={disabled}
            variant="outlined"
            onClick={this.updateArticle}
          >
            Update
          </Button>
          <Button
            disabled={disabled}
            style={{ marginLeft: 5 }}
            variant="outlined"
            onClick={() =>
              this.setState((prevState) => ({
                value: prevState.value === 0 ? 1 : 0,
              }))
            }
          >
            {value ? "Edit" : "preview"}
          </Button>
          <Link
            to="/myarticles"
            style={{ textDecoration: "none", marginLeft: 5 }}
          >
            <Button variant="outlined">Close</Button>
          </Link>
        </div>
      </>
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
    getSingle: (id, callback) => dispatch(getSingleArticle(id, callback)),
    updateArticle: (id, article) => dispatch(updateArticle(id, article)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
