import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  TextField,
  Typography,
  Button,
  Tabs,
  Tab,
  AppBar,
  Paper,
  Divider,
} from "@material-ui/core";

//actions
import { addArticle } from "../../store/actions/articleActions";
import TabPanel from "../../utils/TabPanel";
import MarkedDown from "../../components/MarkedDown";
import ElevationScroll from "../../utils/ElevationScroll";
import { TagsSelect } from "../../components";

class AddArticle extends Component {
  mounted = true;
  state = {
    value: 0,
    author: "",
    body: "",
    title: "",
    tags: [],
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

  setTags = (v) => {
    this.mounted && this.setState({ tags: v });
  };

  addArticle = () => {
    const { tags, title, body, author } = this.state;
    const article = { body, title, tags, author };
    console.log(article);
    this.props.addArticle(article, () => {
      this.mounted &&
        this.setState({
          body: "",
          title: "",
          tags: [],
        });
    });
  };

  render() {
    const { auth } = this.props;
    const { title, body, value } = this.state;

    return (
      <>
        <ElevationScroll {...this.props}>
          <AppBar position="sticky" style={{ backgroundColor: "white" }}>
            <Tabs
              value={value}
              onChange={(e, v) => this.setState({ value: v })}
              indicatorColor="secondary"
              textColor="secondary"
              centered
            >
              <Tab label="Edit" />
              <Tab label="Preview" />
            </Tabs>
          </AppBar>
        </ElevationScroll>
        <TabPanel value={value} index={0}>
          <Container maxWidth="md">
            <TagsSelect setTags={this.setTags} tags={this.state.tags} />
            <TextField
              variant="standard"
              margin="normal"
              label="Title"
              fullWidth
              value={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
              placeholder="Title of your post"
            />
            <Typography color="textSecondary" gutterBottom variant="caption">
              {Date()}
            </Typography>

            <Divider variant="fullWidth" />
            <br />
            <TextField
              value={body}
              onChange={(e) => {
                this.setState({ body: e.target.value });
              }}
              fullWidth
              placeholder="Body"
              multiline
              label="Body"
              variant="filled"
              disabled={auth ? false : true}
            />

            <div
              style={{
                paddingTop: 10,
                paddingLeft: 0,
              }}
            >
              <Button
                disabled={auth ? false : true}
                variant="outlined"
                onClick={this.addArticle}
              >
                Submit
              </Button>
            </div>

            {/* <ReactMarkdown
                  className="markdown"
                  source={body || `## use markdown or html \n goodluck!`}
                  escapeHtml={false}
                /> */}
          </Container>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Container component={Paper} maxWidth="md">
            <MarkedDown
              date={Date().substr(0, 25)}
              tags={this.state.tags}
              body={body}
              title={title}
            />
          </Container>
        </TabPanel>
      </>
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
