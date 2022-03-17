import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../../System/Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getSpecialById, getRequireDoctorInfo } from "../../../store/actions";
import { languages } from "../../../utils";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      specialtyById: {},
      listProvince: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.specialtyById !== this.props.specialtyById) {
      this.setState({
        specialtyById: this.props.specialtyById,
        arrDoctorId:
          this.props.specialtyById.infor && this.props.specialtyById.infor.data
            ? this.props.specialtyById.infor.data.doctorSpecialty
            : [],
      });
    }
    if (prevProps.language !== this.props.language) {
      let { resProvince } = this.props.allRequiredInfo;
      if (resProvince.data) {
        let optionsProvince = this.buildOptionsDoctor(
          resProvince.data.data,
          "NON-USER"
        );
        this.setState({
          listProvince: optionsProvince,
        });
      }
    }
    if (prevProps.allRequiredInfo !== this.props.allRequiredInfo) {
      let { resProvince } = this.props.allRequiredInfo;
      if (resProvince.data) {
        let optionsProvince = this.buildOptionsDoctor(
          resProvince.data.data,
          "NON-USER"
        );
        this.setState({
          listProvince: optionsProvince,
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
      options.unshift({
        label: "ALL",
        value: "ALL",
      });
    }
    return options;
  };
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      this.props.getSpecialById(this.props.match.params.id, "ALL");
      this.props.getRequireDoctorInfo();
    }
  }
  handleOnChangeInput = (event) => {
    if (event) {
      this.props.getSpecialById(this.props.match.params.id, event.target.value);
    }
  };
  render() {
    let { arrDoctorId, specialtyById, listProvince } = this.state;
    let listIdDoctor = [];
    if (arrDoctorId) {
      arrDoctorId.forEach((item) => {
        if (item) {
          let obj = {
            id: item.doctorId,
            province: item.provinceId,
          };
          listIdDoctor.push(obj);
        }
      });
    }
    return (
      <>
        {" "}
        <div className="boundary">
          <HomeHeader />
          <div className="intro-specialty">
            {specialtyById &&
              specialtyById.infor &&
              specialtyById.infor.data && (
                <p className="title-spe">{specialtyById.infor.data.name}</p>
              )}
            {specialtyById && specialtyById.infor && specialtyById.infor.data && (
              <div
                dangerouslySetInnerHTML={{
                  __html: specialtyById.infor.data.descriptionHTML,
                }}
              />
            )}
          </div>
          <div className="select-province">
            <select onChange={(event) => this.handleOnChangeInput(event)}>
              {listProvince.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>
          </div>
          {listIdDoctor &&
            listIdDoctor.map((item, index) => {
              let indexProfile = index;
              return (
                <div className="detail-container">
                  <div className="detail-first-child">
                    <ProfileDoctor
                      key={indexProfile}
                      doctorId={item.id}
                      isShowDescription={true}
                    />
                  </div>
                  <div className="detail-child">
                    <div className="content-up">
                      <DoctorSchedule
                        key={index}
                        doctorIdFromParent={item.id}
                      />
                    </div>
                    <div className="content-down">
                      <DoctorExtraInfor
                        key={item}
                        doctorIdFromParent={item.id}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    specialtyById: state.admin.specialtyById,
    allRequiredInfo: state.admin.allRequiredInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSpecialById: (id, location) => dispatch(getSpecialById(id, location)),
    getRequireDoctorInfo: () => dispatch(getRequireDoctorInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
