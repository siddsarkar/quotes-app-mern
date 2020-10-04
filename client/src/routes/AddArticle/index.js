import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  FormControl,
  FormGroup,
  FormLabel,
  FormHelperText,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

//actions
import { addArticle } from "../../store/actions/articleActions";

class AddArticle extends Component {
  mounted = true;
  state = {
    author: "",
    body: "",
    title: "",
    tags: {
      love: false,
      inspiration: false,
      travel: false,
    },
  };

  getAuthorname = () => {
    this.mounted && this.setState({ author: this.props.authenticatedUsername });
  };

  componentDidMount() {
    this.mounted = true;
    this.getAuthorname();
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  addArticle = () => {
    const filterSelected = Object.fromEntries(
      Object.entries(this.state.tags).filter(([key, value]) => value === true)
    );
    const [first, ...rest] = Object.keys(filterSelected);
    if ([first, ...rest].length >= 1 && [first, ...rest][0] !== undefined) {
      const article = {
        author: this.state.author,
        body: this.state.body,
        title: this.state.title,
        tags: [first, ...rest],
      };

      this.props.addArticle(article, () => {
        this.mounted &&
          this.setState({
            body: "",
            title: "",
            tags: {
              love: false,
              inspiration: false,
              travel: false,
            },
          });
      });
    }
  };

  handleChange = (event) => {
    const name = event.target.name;
    const checked = event.target.checked;
    this.mounted &&
      this.setState((state) => ({
        tags: { ...state.tags, [name]: checked },
      }));
  };

  render() {
    const { love, inspiration, travel } = this.state.tags;
    const error = [love, inspiration, travel].filter((v) => v).length < 1;
    const { auth } = this.props;
    const { author, title, body } = this.state;
    return (
      <Container style={{ padding: 20 }}>
        {auth ? null : (
          <Typography
            color="textSecondary"
            variant="h4"
            style={{ textAlign: "left" }}
          >
            Login to Write!
          </Typography>
        )}
        <Typography style={{ padding: 20, paddingLeft: 0 }} variant="h3">
          Write Your Quote
        </Typography>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField
              value={author}
              id="standard-basic"
              label="Username"
              disabled
            />
          </Grid>
        </Grid>
        <br />
        <TextField
          value={title}
          style={{ marginBottom: 20 }}
          fullWidth
          onChange={(e) => {
            this.setState({ title: e.target.value });
          }}
          placeholder="Title"
          disabled={auth ? false : true}
        />
        <br />
        <TextField
          value={body}
          onChange={(e) => {
            this.setState({ body: e.target.value });
          }}
          fullWidth
          placeholder="Body"
          multiline
          rows={4}
          variant="outlined"
          disabled={auth ? false : true}
        />
        <br />
        <br />
        <FormControl
          disabled={auth ? false : true}
          required
          error={error}
          component="fieldset"
        >
          <FormLabel component="legend">Tags</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={love}
                  onChange={this.handleChange}
                  name="love"
                />
              }
              label="Love"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={inspiration}
                  onChange={this.handleChange}
                  name="inspiration"
                />
              }
              label="Inspiration"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={travel}
                  onChange={this.handleChange}
                  name="travel"
                />
              }
              label="Travel"
            />
          </FormGroup>
          <FormHelperText>Pick at least one tag!</FormHelperText>
        </FormControl>
        <br />
        <div style={{ padding: 20, paddingLeft: 0 }}>
          <Button
            disabled={auth ? false : true}
            variant="outlined"
            onClick={this.addArticle}
          >
            Submit
          </Button>
        </div>
        <div style={{ margin: 10, textAlign: "center" }}>
          <Typography color="textSecondary" variant="caption">
            Copyright@2020_Siddhartha Sarkar
          </Typography>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticatedUsername: state.users.authenticatedUsername,
    auth: state.users.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addArticle: (article, callback) => dispatch(addArticle(article, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);
