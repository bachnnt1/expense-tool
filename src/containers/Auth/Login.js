import { push } from "connected-react-router";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handeLogin } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    try {
      let result = await handeLogin(this.state.username, this.state.password);
      console.log(result);
      if (result && result.user.errCode === 0) {
        this.props.userLoginSuccess(result.user.user);
      }
    } catch (e) {
      alert(e);
    }
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username..."
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUsername(event)}
              ></input>
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password..."
                value={this.state.password}
                onChange={(event) => this.handleOnChangePassword(event)}
              ></input>
            </div>
            <div className="col-12">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login"> Or login with</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
