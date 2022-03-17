import MarkdownIt from "markdown-it";
import React, { Component } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { connect } from "react-redux";
import Select from "react-select";
import {
  getAllDoctorAction,
  postDoctorAction,
  getRequireDoctorInfo,
} from "../../../store/actions/adminActions";
import "./ManageDoctor.scss";
import "./TableManageUser.scss";
import { languages } from "../../../utils";
import { getDetailDoctorById } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: "",
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      listDoctors: [],
      listOptionDoctors: [],
      isEdit: false,
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listSpe: [],
      arrayClinic: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic: "",
      selectedSpecialty: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  async componentDidMount() {
    this.props.getAllDoctorAction();
    this.props.getRequireDoctorInfo();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let options = this.buildOptionsDoctor(this.props.allDoctors, "USER");
      this.setState({
        listOptionDoctors: options,
      });
    }
    if (prevProps.language !== this.props.language) {
      let options = this.buildOptionsDoctor(this.props.allDoctors, "USER");
      this.setState({
        listOptionDoctors: options,
      });
      let { resPrice, resPayment, resProvince, listSpecialty, listClinic } =
        this.props.allRequiredInfo;
      if (
        resPrice.data &&
        resPayment.data &&
        resProvince.data &&
        listSpecialty &&
        listClinic
      ) {
        let optionsPrice = this.buildOptionsDoctor(
          resPrice.data.data,
          "NON-USER"
        );
        let optionsPayment = this.buildOptionsDoctor(
          resPayment.data.data,
          "NON-USER"
        );
        let optionsProvince = this.buildOptionsDoctor(
          resProvince.data.data,
          "NON-USER"
        );
        let listSpe = [];
        if (listSpecialty && listSpecialty.infor && listSpecialty.infor.data) {
          listSpecialty.infor.data.forEach((item) => {
            if (item) {
              let obj = {
                label: item.name,
                value: item.id,
              };
              listSpe.push(obj);
            }
          });
        }
        let lstClinic = [];
        if (listClinic && listClinic.infor && listClinic.infor.data) {
          listClinic.infor.data.forEach((item) => {
            if (item) {
              let obj = {
                label: item.name,
                value: item.id,
              };
              lstClinic.push(obj);
            }
          });
        }
        this.setState({
          listPrice: optionsPrice,
          listPayment: optionsPayment,
          listProvince: optionsProvince,
          listSpe: listSpe,
          arrayClinic: lstClinic,
        });
      }
    }
    if (prevProps.allRequiredInfo !== this.props.allRequiredInfo) {
      let { resPrice, resPayment, resProvince, listSpecialty, listClinic } =
        this.props.allRequiredInfo;
      if (
        resPrice.data &&
        resPayment.data &&
        resProvince.data &&
        listSpecialty &&
        listClinic
      ) {
        let optionsPrice = this.buildOptionsDoctor(
          resPrice.data.data,
          "NON-USER"
        );
        let optionsPayment = this.buildOptionsDoctor(
          resPayment.data.data,
          "NON-USER"
        );
        let optionsProvince = this.buildOptionsDoctor(
          resProvince.data.data,
          "NON-USER"
        );
        let listSpe = [];
        if (listSpecialty && listSpecialty.infor && listSpecialty.infor.data) {
          listSpecialty.infor.data.forEach((item) => {
            if (item) {
              let obj = {
                label: item.name,
                value: item.id,
              };
              listSpe.push(obj);
            }
          });
        }
        let lstClinic = [];
        if (listClinic && listClinic.infor && listClinic.infor.data) {
          listClinic.infor.data.forEach((item) => {
            if (item) {
              let obj = {
                label: item.name,
                value: item.id,
              };
              lstClinic.push(obj);
            }
          });
        }
        this.setState({
          listPrice: optionsPrice,
          listPayment: optionsPayment,
          listProvince: optionsProvince,
          listSpe: listSpe,
          arrayClinic: lstClinic,
        });
      }
    }
  }
  buildOptionsDoctor = (inputData, type) => {
    let options = [];
    if (inputData) {
      inputData.forEach((item, index) => {
        let labelVi =
          type === "USER" ? `${item.firstName} ${item.lastName}` : item.valueVi;
        let labelEn =
          type === "USER" ? `${item.lastName} ${item.firstName}` : item.valueEn;
        if (type === "USER") {
          options.push({
            label: this.props.language === languages.VI ? labelVi : labelEn,
            value: item.id,
          });
        } else {
          options.push({
            label: this.props.language === languages.VI ? labelVi : labelEn,
            value: item.keyMap,
          });
        }
      });
    }
    return options;
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  deleteUser = (userId) => {
    this.props.deleteUserRedux(userId);
  };
  handleChange = async (event) => {
    let doctorDetail = await getDetailDoctorById(event.value);
    console.log(doctorDetail);
    let { listPrice, listPayment, listProvince, listSpe } = this.state;
    if (
      doctorDetail &&
      doctorDetail.response &&
      doctorDetail.response.data &&
      doctorDetail.response.data.Markdown
    ) {
      let selectdPrice = "";
      let selectdCash = "";
      let selectdProvince = "";
      let selectedClinic = "";
      let selectedSpecialty = "";
      let nameClinic = doctorDetail.response.data.Doctor_Info
        ? doctorDetail.response.data.Doctor_Info.nameClinic
        : "";
      let addressClinic = doctorDetail.response.data.Doctor_Info
        ? doctorDetail.response.data.Doctor_Info.addressClinic
        : "";
      let note = doctorDetail.response.data.Doctor_Info
        ? doctorDetail.response.data.Doctor_Info.note
        : "";
      if (doctorDetail.response.data.Doctor_Info) {
        selectdPrice = listPrice.filter((item) => {
          return item.value === doctorDetail.response.data.Doctor_Info.priceId;
        });
        selectdCash = listPayment.filter((item) => {
          return (
            item.value === doctorDetail.response.data.Doctor_Info.paymentId
          );
        });
        selectdProvince = listProvince.filter((item) => {
          return (
            item.value === doctorDetail.response.data.Doctor_Info.provinceId
          );
        });
        selectedSpecialty = listSpe.filter((item) => {
          return (
            item.value === doctorDetail.response.data.Doctor_Info.specialtyId
          );
        });
      }
      this.setState({
        contentHTML: doctorDetail.response.data.Markdown.contentHTML,
        contentMarkdown: doctorDetail.response.data.Markdown.contentMarkdown,
        description: doctorDetail.response.data.Markdown.description,
        isEdit: true,
        selectedDoctor: event,
        selectedPrice: selectdPrice,
        selectedPayment: selectdCash,
        selectedProvince: selectdProvince,
        nameClinic: nameClinic,
        addressClinic: addressClinic,
        note: note,
        selectedClinic: selectedClinic, // TODO
        selectedSpecialty: selectedSpecialty,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        isEdit: false,
        selectedDoctor: event,
        selectedPrice: "",
        selectedPayment: "",
        selectedProvince: "",
        nameClinic: "",
        addressClinic: "",
        note: "",
        selectedClinic: "",
        selectedSpecialty: "",
      });
    }
  };
  handleOnChangeDes = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  submit = () => {
    let data = {
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: this.state.isEdit,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      selectedClinic: this.state.selectedClinic.value,
      selectedSpecialty: this.state.selectedSpecialty.value,
    };
    this.props.postDoctorAction(data);
  };
  handleChangeSelected = (event, fieldSelected) => {
    let stateCopy = { ...this.state };
    stateCopy[fieldSelected] = event;
    this.setState({
      ...stateCopy,
    });
  };
  handleChangeText = (event, fieldSelected) => {
    let stateCopy = { ...this.state };
    stateCopy[fieldSelected] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  render() {
    let {
      selectedDoctor,
      description,
      listOptionDoctors,
      isEdit,
      contentMarkdown,
      selectedPrice,
      selectedPayment,
      selectedProvince,
      listPrice,
      listPayment,
      listProvince,
      nameClinic,
      addressClinic,
      note,
      selectedClinic,
      selectedSpecialty,
      listSpe,
      arrayClinic,
    } = this.state;
    return (
      <>
        <h3 className="title">Manage doctor</h3>
        <div className="more-info">
          <Select
            className="select"
            value={selectedDoctor}
            onChange={(event) => this.handleChange(event)}
            options={listOptionDoctors}
            placeholder="Chọn bác sĩ"
          />
          <textarea
            className="text-area"
            onChange={(event) => this.handleOnChangeDes(event)}
            value={description}
          ></textarea>
        </div>
        <div>
          <div className="required-input">
            <Select
              className="select"
              value={selectedPrice}
              onChange={(event) =>
                this.handleChangeSelected(event, "selectedPrice")
              }
              options={listPrice}
              placeholder="Chọn giá"
            />
            <Select
              className="select"
              value={selectedPayment}
              onChange={(event) =>
                this.handleChangeSelected(event, "selectedPayment")
              }
              options={listPayment}
              placeholder="Chọn kiểu thanh toán"
            />
            <Select
              className="select"
              value={selectedProvince}
              onChange={(event) =>
                this.handleChangeSelected(event, "selectedProvince")
              }
              options={listProvince}
              placeholder="Chọn tỉnh"
            />
          </div>
          <div className="required-input">
            <Select
              className="select"
              value={selectedSpecialty}
              onChange={(event) =>
                this.handleChangeSelected(event, "selectedSpecialty")
              }
              options={listSpe}
              placeholder="Chọn chuyên khoa"
            />
            <Select
              className="select"
              value={selectedClinic}
              onChange={(event) =>
                this.handleChangeSelected(event, "selectedClinic")
              }
              options={arrayClinic}
              placeholder="Chọn phòng khám"
            />
          </div>
        </div>
        <div>
          <div className="required-input">
            <input
              type="text"
              placeholder="Tên phòng khám"
              value={nameClinic}
              onChange={(event) => this.handleChangeText(event, "nameClinic")}
            />
            <input
              type="text"
              placeholder="Địa chỉ phòng khám"
              value={addressClinic}
              onChange={(event) =>
                this.handleChangeText(event, "addressClinic")
              }
            />
            <input
              type="text"
              placeholder="Ghi chú"
              value={note}
              onChange={(event) => this.handleChangeText(event, "note")}
            />
          </div>
        </div>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
          value={contentMarkdown}
        />
        <div className="submit">
          <button onClick={() => this.submit()}>
            {isEdit ? "Sửa thông tin" : "Lưu thông tin"}
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequiredInfo: state.admin.allRequiredInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorAction: () => dispatch(getAllDoctorAction()),
    postDoctorAction: (data) => dispatch(postDoctorAction(data)),
    getRequireDoctorInfo: () => dispatch(getRequireDoctorInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
