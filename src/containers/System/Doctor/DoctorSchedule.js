import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { languages } from "../../../utils";
import { getScheduleByDoctorId } from "../../../store/actions";
import "./DoctorSchedule.scss";
import BookingModal from "../../Patient/Doctor/Modal/BookingModal";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvaiTime: [],
      isOpenBookingModal: false,
      timeDetail: {},
    };
  }
  async componentDidMount() {
    let { lang } = this.props;
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      if (lang === languages.VI) {
        obj.label = moment(new Date())
          .add(i, "days")
          .locale("vi")
          .format("dddd - DD/MM");
      } else {
        obj.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
      }

      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(obj);
    }

    this.setState({
      allDays: arrDate,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.lang !== this.props.lang) {
      let arrDate = [];
      for (let i = 0; i < 7; i++) {
        let obj = {};
        if (this.props.lang === languages.VI) {
          obj.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
        } else {
          obj.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }

        obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
        arrDate.push(obj);
      }

      this.setState({
        allDays: arrDate,
      });
    }
  }
  handleChangeDate = async (event) => {
    await this.props.getScheduleByDoctorId(
      this.props.doctorIdFromParent,
      event.target.value
    );
    let { scheduleByDate } = this.props;
    this.setState({
      allAvaiTime: scheduleByDate,
    });
  };
  showDetailSchedule = (item) => {
    this.setState({
      isOpenBookingModal: true,
      timeDetail: item,
    });
  };
  toogleFromParent = () => {
    this.setState({
      isOpenBookingModal: false,
    });
  };
  render() {
    let { allDays, allAvaiTime, isOpenBookingModal, timeDetail } = this.state;
    let { lang } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleChangeDate(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="available-time">
            <div className="calendar">
              <span>
                <i className="fas fa-calendar-alt" />
                Lịch khám
              </span>
            </div>
            <div className="time-content">
              {allAvaiTime && allAvaiTime.length > 0 ? (
                allAvaiTime.map((item, index) => {
                  let timeDisplay =
                    lang === languages.VI
                      ? item.timeTypeData.valueVi
                      : item.timeTypeData.valueEn;
                  return (
                    <button
                      key={index}
                      onClick={() => this.showDetailSchedule(item)}
                    >
                      {timeDisplay}
                    </button>
                  );
                })
              ) : (
                <span>Không có lịch khám ngày này</span>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenBookingModal={isOpenBookingModal}
          timeDetail={timeDetail}
          toogleFromParent={this.toogleFromParent}
          doctorId={this.props.doctorIdFromParent}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    scheduleByDate: state.admin.scheduleByDate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getScheduleByDoctorId: (id, date) =>
      dispatch(getScheduleByDoctorId(id, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
