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
    value: 0,
    author: "",
    body: "",
    title: "",
    tags: [],
    uploadedFile: [],
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

    // var link = `![${text.split(".")[0]}](/image/${text})`;
    // var textField = document.createElement("textarea");
    // textField.innerText = link;
    // document.body.appendChild(textField);
    // textField.select();
    // document.execCommand("copy");
    // alert("Copied the text: " + textField.value);
    // textField.remove();
  };

  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
    // console.log(event.target.files[0]);
  };

  // / On file upload (click the upload button)
  onFileUpload = async () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "cover",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    let req = await fetch("/upload/cover", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        enctype: "multipart/form-data",
      },
      body: formData,
    });

    let res = await req.json();
    console.log(res);
    this.setState({ uploadedFile: [...this.state.uploadedFile, res.file] });
  };

  // file upload is complete
  fileData = () => {
    if (this.state.uploadedFile.length > 0) {
      return this.state.uploadedFile.map((file) => {
        return (
          <div
            key={file.id}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <img
              src={"/image/" + file.filename}
              alt={file.filename}
              style={{ height: 120, width: "auto" }}
            />

            <input
              type='text'
              readOnly
              ref={this.linkref}
              value={`![${file.originalname.split(".")[0]}](/image/${
                file.filename
              })`}
              id='myInput'
            />
            <button onClick={this.linkHandler}>Copy Link</button>
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
          <AppBar position='sticky' style={{ backgroundColor: "white" }}>
            <Tabs
              value={value}
              onChange={(e, v) => this.setState({ value: v })}
              indicatorColor='secondary'
              textColor='secondary'
              centered
            >
              <Tab label='Edit' />
              <Tab label='Preview' />
            </Tabs>
          </AppBar>
        </ElevationScroll>
        <TabPanel value={value} index={0}>
          <Container maxWidth='md'>
            <TagsSelect setTags={this.setTags} tags={this.state.tags} />
            <TextField
              variant='standard'
              margin='normal'
              label='Title'
              fullWidth
              value={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
              placeholder='Title of your post'
            />
            <Typography color='textSecondary' gutterBottom variant='caption'>
              {Date().substr(0, 15)}
            </Typography>

            <Divider variant='fullWidth' />
            <br />
            <TextField
              value={body}
              onChange={(e) => {
                this.setState({ body: e.target.value });
              }}
              fullWidth
              placeholder='Body'
              rows={18}
              multiline
              // label="Body"
              variant='filled'
              disabled={auth ? false : true}
            />

            <div>
              <input type='file' name='cover' onChange={this.onFileChange} />
              <button onClick={this.onFileUpload}>Upload!</button>
            </div>

            {this.fileData()}

            <div
              style={{
                paddingTop: 10,
                paddingLeft: 0,
              }}
            >
              <Button
                disabled={auth ? false : true}
                variant='outlined'
                onClick={this.addArticle}
              >
                Submit
              </Button>
              <Typography color='textSecondary'>
                Signed In as : {authenticatedUsername}
              </Typography>
            </div>
          </Container>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Container component={Paper} elevation={0} maxWidth='md'>
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
