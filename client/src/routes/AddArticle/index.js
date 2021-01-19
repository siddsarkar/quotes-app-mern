import {
  AppBar,
  Button,
  Container,
  Divider,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { TagsSelect } from "../../components";
import MarkedDown from "../../components/MarkedDown";
//actions
import { addArticle } from "../../store/actions/articleActions";
import ElevationScroll from "../../utils/ElevationScroll";
import TabPanel from "../../utils/TabPanel";

class AddArticle extends Component {
  mounted = true;
  state = {
    selectedFile: "",
    selectedFileAsB64: "",
    value: 0,
    author: "",
    body: "",
    title: "",
    tags: [],
    uploadedFile: [],
    uploading: false,
  };
  linkref = React.createRef(null);

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
    tags.length &&
      this.props.addArticle(article, () => {
        this.mounted &&
          this.setState({
            body: "",
            title: "",
            tags: [],
          });
      });
  };
  linkHandler = (text) => {
    this.linkref.current.select();
    document.execCommand("copy");
    alert("Copied the text: " + this.linkref.current.value);
  };

  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
    this.setB64(event.target.files[0]);
  };

  setB64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({ selectedFileAsB64: reader.result });
    };
  };

  // / On file upload (click the upload button)
  onFileUpload = async () => {
    if (this.state.selectedFileAsB64 === "") {
      return;
    }
    this.setState({ uploading: true });
    let req = await fetch("/upload/cover", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ data: this.state.selectedFileAsB64 }),
    });

    let res = await req.json();
    // console.log(res);
    this.setState({
      uploadedFile: [...this.state.uploadedFile, res.file],
      uploading: false,
    });
  };

  // file upload is complete
  fileData = () => {
    if (this.state.uploadedFile.length > 0) {
      return this.state.uploadedFile.map((file, i) => {
        return (
          <div
            key={file.asset_id}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <img
              src={file.url}
              alt={file.url}
              style={{ height: 120, width: "auto" }}
            />

            <input
              type="text"
              readOnly
              ref={this.linkref}
              value={`![${file.public_id}](${file.url})`}
              id="myInput"
            />
            <button onClick={this.linkHandler}>Copy Link</button>
            {this.state.uploading && "Uploading...."}
          </div>
        );
      });
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    const { auth, authenticatedUsername } = this.props;
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
              {Date().substr(0, 15)}
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
              rows={18}
              multiline
              // label="Body"
              variant="filled"
              disabled={auth ? false : true}
            />

            <div>
              <input type="file" name="cover" onChange={this.onFileChange} />
              <button onClick={this.onFileUpload}>Upload!</button>
            </div>
            {this.state.uploading && "Uploading...."}
            {this.fileData()}

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
              <Typography color="textSecondary">
                Signed In as : {authenticatedUsername}
              </Typography>
            </div>
          </Container>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Container component={Paper} elevation={0} maxWidth="md">
            <MarkedDown
              date={Date().substr(0, 15)}
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
