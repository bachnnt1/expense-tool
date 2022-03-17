import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createNewUser,
  deleteUser,
  editUserService,
  getAllUsers,
} from "../../services/userService";
import ModalEditUser from "./ModalEditUser";
import ModalUser from "./ModalUser";
import "./userManage.scss";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      arrUser: [],
      isEdit: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsers();
  }
  handleAddNewUser = () => {
    this.setState({
      isOpenModal: true,
    });
  };

  toogleUserModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  toogleUserEditModal = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };
  createNewUser = async (data) => {
    try {
      await createNewUser(data);
      await this.getAllUsers();
      this.setState({
        isOpenModal: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  getAllUsers = async () => {
    let response = await getAllUsers("ALL");
    this.setState({
      arrUser: response.user,
    });
  };
  handleDeleteUser = async (item) => {
    try {
      await deleteUser(item.id);
      await this.getAllUsers();
    } catch (e) {}
  };

  handleEditUser = async (item) => {
    try {
      this.setState({
        isEdit: true,
        userEdit: item,
      });
    } catch (e) {}
  };

  handleDoEditUser = async (user) => {
    try {
      await editUserService(user);
      this.setState({
        isEdit: false,
      });
      await this.getAllUsers();
    } catch (e) {}
  };
  render() {
    let arrUser = this.state.arrUser;
    return (
      <div className="user-container">
        <div className="title text-center">Cố lên Bách</div>
        <div className="mx-1">
          <button className="btn btn-primary" onClick={this.handleAddNewUser}>
            Add new user
          </button>
        </div>
        <ModalUser
          isOpen={this.state.isOpenModal}
          toogleFromParent={this.toogleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isEdit && (
          <ModalEditUser
            isOpen={this.state.isEdit}
            toogleFromParent={this.toogleUserEditModal}
            currentUser={this.state.userEdit}
            editUser={this.handleDoEditUser}
          />
        )}

        <div className="user-table">
          <table>
            <tbody>
              <tr>
                <th>Email</th>
                <th>FullName</th>
                <th>Lastname</th>
                <th>address</th>
                <th>action</th>
              </tr>
              {arrUser &&
                arrUser.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button onClick={() => this.handleEditUser(item)}>
                          Edit
                        </button>
                        <button onClick={() => this.handleDeleteUser(item)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
