import React, { Component } from "react";
import { connect } from "react-redux";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageClinic.scss";
import { CommonUtils } from "../../../utils";
import { createNewClinicAction } from "../../../store/actions/adminActions";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      previewImage: "",
      name: "",
      address: "",
    };
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        previewImage: base64,
      });
    }
  };
  handleChangeInput = (event, id) => {
    if (event) {
      let copyState = { ...this.state };
      copyState[id] = event.target.value;
      this.setState({
        ...copyState,
      });
    }
  };
  handleSubmit = () => {
    this.props.createNewClinicAction(this.state);
  };
  render() {
    let { contentMarkdown, name, address } = this.state;
    return (
      <div className="boundary-container">
        <div className="title">
          <p>Quản lý phòng khám</p>
        </div>
        <div className="input-boundary">
          <div className="form-group col-6">
            <label>Tên phòng khám</label>
            <input
              type="text"
              value={name}
              onChange={(event) => this.handleChangeInput(event, "name")}
            />
          </div>
          <div className="form-group col-6">
            <label>Ảnh phòng khám</label>
            <input
              type="file"
              className="form-control-file"
              onChange={(event) => this.handleChangeImage(event)}
            />
          </div>
        </div>
        <div className="input-boundary">
          <div className="form-group col-6">
            <label>Địa chỉ phòng khám</label>
            <input
              type="text"
              value={address}
              onChange={(event) => this.handleChangeInput(event, "address")}
            />
          </div>
        </div>
        <div>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={contentMarkdown}
          />
        </div>
        <div className="button">
          <button type="button" onClick={() => this.handleSubmit()}>
            Add new
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewClinicAction: (data) => dispatch(createNewClinicAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
