import React, { Component } from "react";
import { connect } from "react-redux";
import { userLoginRequest } from "../../store/actions/usersActions";
import { Container, TextField, Button } from "@material-ui/core";
class LoginComponent extends Component {
  state = {
    username: "",
    password: "",
  };

  componentDidMount = () => {
    console.log(this.props.isLoggedin);
  };

  loginHandler = () => {
    this.props.loginRequest(this.state);
  };

  render() {
    return (
      <Container style={{ padding: 20 }}>
        <TextField
          onKeyUp={(e) => this.setState({ username: e.target.value })}
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
          onKeyUp={(e) => this.setState({ password: e.target.value })}
        />
        <br />
        <div style={{ marginTop: 20 }}>
          <Button variant="outlined" onClick={() => this.loginHandler()}>
            Login
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
    loginRequest: (userLoginDetails) =>
      dispatch(userLoginRequest(userLoginDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
