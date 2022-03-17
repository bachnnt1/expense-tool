import React, { Component } from "react";
import { connect } from "react-redux";
import { getClinicByIdAction } from "../../../store/actions/adminActions";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../../System/Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import "./DetailClinic.scss";
import ProfileDoctor from "../Doctor/ProfileDoctor";
class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinicById: {},
    };
  }
  componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      this.props.getClinicByIdAction(this.props.match.params.id);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.clinicById !== this.props.clinicById) {
      if (
        this.props.clinicById &&
        this.props.clinicById.infor &&
        this.props.clinicById.infor.data
      ) {
        this.setState({ clinicById: this.props.clinicById.infor.data });
      }
    }
  }
  render() {
    let { clinicById } = this.state;
    let listIdDoctor = [];
    if (clinicById && clinicById.doctorClinic) {
      clinicById.doctorClinic.forEach((item) => {
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
        <div className="boundary">
          <HomeHeader />
          <div className="intro-specialty">
            {clinicById && <p className="title-spe">{clinicById.name}</p>}
            {clinicById && (
              <div
                dangerouslySetInnerHTML={{
                  __html: clinicById.descriptionHTML,
                }}
              />
            )}
          </div>
          {listIdDoctor.map((item, index) => {
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
                    <DoctorSchedule key={index} doctorIdFromParent={item.id} />
                  </div>
                  <div className="content-down">
                    <DoctorExtraInfor key={item} doctorIdFromParent={item.id} />
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
    clinicById: state.admin.clinicById,
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClinicByIdAction: (id) => dispatch(getClinicByIdAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
