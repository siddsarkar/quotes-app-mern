import React, { Component } from "react";
import { connect } from "react-redux";
import {
  userLoginRequest,
  userLogoutRequest,
  userSignUpRequest,
} from "../../store/actions/usersActions";
import {
  Container,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Container>{children}</Container>}
    </div>
  );
}
class Login extends Component {
  mounted = false;
  state = {
    username: "",
    password: "",
    name: "",
    value: 0,
  };

  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  loginHandler = () => {
    const details = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.loginRequest(
      details,
      () =>
        this.mounted && this.setState({ name: "", username: "", password: "" })
    );
  };

  cb = () => {
    this.mounted && this.setState({ value: 0 });
  };
  signupHandler = () => {
    const details = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
    };
    this.props.usersignup(details, this.cb);
  };

  logoutHandler = () => {
    this.props.logoutRequest();
  };

  render() {
    return (
      <>
        <Tabs
          value={this.state.value}
          onChange={(e, v) => this.setState({ value: v })}
          indicatorColor="secondary"
          textColor="seconsary"
          centered
        >
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>
        <TabPanel value={this.state.value} index={0}>
          <>
            {this.props.isLoggedin ? (
              <Button
                style={{ marginTop: 20 }}
                variant="outlined"
                onClick={() => this.logoutHandler()}
              >
                Logout
              </Button>
            ) : (
              <>
                <TextField
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                  required
                  id="standard-required"
                  label="Username"
                  fullWidth
                  style={{ marginBottom: 20 }}
                />
                <br />
                <TextField
                  fullWidth
                  required
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <br />
                <Button
                  style={{ marginTop: 20 }}
                  variant="outlined"
                  onClick={() => this.loginHandler()}
                >
                  Login
                </Button>
              </>
            )}
          </>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          {this.props.isLoggedin ? (
            <div style={{ margin: 20, textAlign: "center" }}>
              <Typography variant="h5">You are already Logged In!</Typography>
            </div>
          ) : (
            <>
              <TextField
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
                required
                id="standard-required"
                label="Name"
                fullWidth
                style={{ marginBottom: 20 }}
              />
              <TextField
                value={this.state.username}
                onChange={(e) => this.setState({ username: e.target.value })}
                required
                id="standard-required"
                label="Username"
                fullWidth
                style={{ marginBottom: 20 }}
              />
              <br />
              <TextField
                fullWidth
                required
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <br />
              <div style={{ marginTop: 20 }}>
                <Button variant="outlined" onClick={() => this.signupHandler()}>
                  Signup
                </Button>
              </div>
            </>
          )}
        </TabPanel>
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Typography color="textSecondary" variant="caption">
            Copyright@2020_Siddhartha_Sarkar
          </Typography>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedin: state.users.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (userLoginDetails, callback) =>
      dispatch(userLoginRequest(userLoginDetails, callback)),
    logoutRequest: () => dispatch(userLogoutRequest()),
    usersignup: (details, cb) => dispatch(userSignUpRequest(details, cb)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
