import React, { Component } from "react";
import { connect } from "react-redux";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageSpecialty.scss";
import { CommonUtils } from "../../../utils";
import { createNewSpecialtyAction } from "../../../store/actions/adminActions";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      previewImage: "",
      name: "",
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
  handleChangeName = (event) => {
    if (event) {
      let copyState = { ...this.state };
      copyState["name"] = event.target.value;
      this.setState({
        ...copyState,
      });
    }
  };
  handleSubmit = () => {
    this.props.createNewSpecialtyAction(this.state);
  };
  render() {
    let { contentMarkdown, name, previewImage } = this.state;
    return (
      <div className="boundary-container">
        <div className="title">
          <p>Quản lý chuyên khoa</p>
        </div>
        <div className="input-boundary">
          <div className="form-group col-6">
            <label>Tên chuyên khoa</label>
            <input
              type="text"
              value={name}
              onChange={(event) => this.handleChangeName(event)}
            />
          </div>
          <div className="form-group col-6">
            <label>Ảnh chuyên khoa</label>
            <input
              type="file"
              className="form-control-file"
              onChange={(event) => this.handleChangeImage(event)}
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
    createNewSpecialtyAction: (data) =>
      dispatch(createNewSpecialtyAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
