import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import {
  fetchAllUsers,
  deleteUserRedux,
} from "../../../store/actions/adminActions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }

  async componentDidMount() {
    this.props.fetchAllUsers();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.users !== this.props.users) {
      this.setState({ userRedux: this.props.users });
    }
  }

  deleteUser = (userId) => {
    this.props.deleteUserRedux(userId);
  };
  render() {
    let { userRedux } = this.state;
    return (
      <div className="user-container">
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
              {userRedux &&
                userRedux.length > 0 &&
                userRedux.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <i
                          className="fas fa-user-times"
                          onClick={(userId) => this.deleteUser(item.id)}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    deleteUserRedux: (userId) => dispatch(deleteUserRedux(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
