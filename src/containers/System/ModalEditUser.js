import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "123456",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }
  noRefCheck = () => {
    this.props.toogleFromParent();
  };

  handleChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleEditUser = () => {
    this.props.editUser(this.state);
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.noRefCheck}
        size="sm"
        centered
        className="boundary"
      >
        <ModalHeader toggle={this.noRefCheck}>Edit a new user</ModalHeader>
        <ModalBody>
          <div className="input-container">
            <label>Email</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleChangeInput(event, "email");
              }}
              value={this.state.email}
              disabled
            ></input>
          </div>
          <div className="input-container">
            <label>Password</label>
            <input
              type="password"
              onChange={(event) => {
                this.handleChangeInput(event, "password");
              }}
              value={this.state.password}
              disabled
            ></input>
          </div>
          <div className="input-container">
            <label>First name</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleChangeInput(event, "firstName");
              }}
              value={this.state.firstName}
            ></input>
          </div>
          <div className="input-container">
            <label>Last name</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleChangeInput(event, "lastName");
              }}
              value={this.state.lastName}
            ></input>
          </div>
          <div className="input-container">
            <label>address</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleChangeInput(event, "address");
              }}
              value={this.state.address}
            ></input>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleEditUser}>
            Update
          </Button>{" "}
          <Button onClick={this.noRefCheck}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
