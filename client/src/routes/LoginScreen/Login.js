import React, { Component } from "react";
import { connect } from "react-redux";
import {
  userLoginRequest,
  userLogoutRequest,
  userSignUpRequest,
} from "../../store/actions/usersActions";
import { Container, TextField, Button } from "@material-ui/core";
class LoginComponent extends Component {
  state = {
    username: "",
    password: "",
    name: "",
    signup: false,
  };

  componentDidMount = () => {
    console.log("Logged In: " + this.props.isLoggedin);
  };

  loginHandler = () => {
    const details = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.loginRequest(details, () =>
      this.setState({ name: "", username: "", password: "" })
    );
  };

  logoutHandler = () => {
    this.props.logoutRequest();
  };
  showSignUP = () => {
    this.setState({ signup: true });
  };
  signupHandler = () => {
    const details = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
    };
    this.props.usersignup(details);
  };

  render() {
    const signupon = (
      <TextField
        value={this.state.name}
        onChange={(e) => this.setState({ name: e.target.value })}
        required
        id="standard-required"
        label="Name"
        fullWidth
        style={{ marginBottom: 20 }}
      />
    );
    return (
      <Container style={{ padding: 20 }}>
        {this.state.signup ? signupon : ""}
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
          <Button variant="outlined" onClick={() => this.loginHandler()}>
            Login
          </Button>
        </div>
        <div style={{ marginTop: 20 }}>
          <Button variant="outlined" onClick={() => this.logoutHandler()}>
            Logout
          </Button>
        </div>
        <div style={{ marginTop: 20 }}>
          <Button
            variant="outlined"
            onClick={
              this.state.signup
                ? () => this.signupHandler()
                : () => this.showSignUP()
            }
          >
            Signup
          </Button>
        </div>
      </Container>
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
    usersignup: (details) => dispatch(userSignUpRequest(details)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
