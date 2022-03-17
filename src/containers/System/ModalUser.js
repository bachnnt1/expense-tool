import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
    };
  }

  componentDidMount() {}
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
  handleAddNewUser = () => {
    this.props.createNewUser(this.state);
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
        <ModalHeader toggle={this.noRefCheck}>Create a new user</ModalHeader>
        <ModalBody>
          <div className="input-container">
            <label>Email</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleChangeInput(event, "email");
              }}
              value={this.state.email}
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
            ></input>
          </div>
          <div className="input-container">
            <label>First name</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleChangeInput(event, "firstname");
              }}
              value={this.state.firstName}
            ></input>
          </div>
          <div className="input-container">
            <label>Last name</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleChangeInput(event, "lastname");
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
          <Button color="primary" onClick={this.handleAddNewUser}>
            Add
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
