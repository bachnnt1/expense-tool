import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Select from "react-select";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getAllCodeTime,
  getAllDoctorAction,
  postBulkSchedule,
} from "../../../store/actions/adminActions";
import { languages } from "../../../utils";
import "./ManageSchedule.scss";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOptionDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
    };
  }
  componentDidMount() {
    this.props.getAllDoctorAction();
    this.props.getAllCodeTime();
  }
  buildOptionsDoctor = () => {
    let options = [];
    this.props.allDoctors.forEach((item, index) => {
      let labelVi = `${item.firstName} ${item.lastName}`;
      let labelEn = `${item.lastName} ${item.firstName}`;
      options.push({
        label: this.props.language === languages.VI ? labelVi : labelEn,
        value: item.id,
      });
    });
    return options;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let options = this.buildOptionsDoctor();
      this.setState({
        listOptionDoctors: options,
      });
    }
    if (prevProps.language !== this.props.language) {
      let options = this.buildOptionsDoctor();
      this.setState({
        listOptionDoctors: options,
      });
    }
    if (prevProps.schedule !== this.props.schedule) {
      let schedule = this.props.schedule;
      schedule = schedule.data.map((item) => ({ ...item, isSelected: false }));
      this.setState({
        rangeTime: schedule,
      });
    }
  }
  handleChange = async (event) => {
    this.setState({
      selectedDoctor: event,
    });
  };
  handleOnChangeDate = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  handleClickTime = (item) => {
    let { rangeTime } = this.state;
    rangeTime.map((child, index) => {
      return child.id === item.id
        ? (child.isSelected = !child.isSelected)
        : child;
    });
    this.setState({
      rangeTime: rangeTime,
    });
  };
  handleAddSchedule = async () => {
    let arrResult = [];
    let { currentDate, selectedDoctor, rangeTime } = this.state;
    // let selectedDate = moment(currentDate).format("DD/MM/YYYY");
    let selectedDate = new Date(currentDate).getTime();

    let selectedTime = rangeTime.filter((item) => item.isSelected === true);
    if (selectedTime && selectedTime.length > 0) {
      selectedTime.map((item) => {
        let obj = {};
        obj.doctorId = selectedDoctor.value;
        obj.timeType = item.keyMap;
        obj.date = selectedDate;
        arrResult.push(obj);
      });
    }
    await this.props.postBulkSchedule({
      arrResult: arrResult,
      doctorId: selectedDoctor.value,
      date: selectedDate,
    });
  };
  render() {
    let { listOptionDoctors, selectedDoctor, rangeTime } = this.state;
    return (
      <>
        <div className="manage-container">
          <div className="title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="input-container">
            <div className="input">
              <label>Chọn bác sĩ</label>
              <Select
                className="select"
                value={selectedDoctor}
                onChange={(event) => this.handleChange(event)}
                options={listOptionDoctors}
                placeholder="Chọn bác sĩ"
              />
            </div>
            <div className="input">
              <label>Chọn ngày</label>
              <DatePicker
                onChange={this.handleOnChangeDate}
                value={this.state.currentDate}
                minDate={new Date()}
              ></DatePicker>
            </div>
          </div>
          <div className="detail">
            <div className="range-time">
              {rangeTime &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      type="button"
                      className={item.isSelected ? "active" : ""}
                      key={index}
                      onClick={() => this.handleClickTime(item)}
                    >
                      {this.props.lang === languages.VI
                        ? item.valueVi
                        : item.valueEn}
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="submit-button">
            <button type="button" onClick={() => this.handleAddSchedule()}>
              <FormattedMessage id="common.add" />
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    allDoctors: state.admin.allDoctors,
    isLoggedIn: state.user.isLoggedIn,
    schedule: state.admin.schedule,
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorAction: () => dispatch(getAllDoctorAction()),
    getAllCodeTime: () => dispatch(getAllCodeTime()),
    postBulkSchedule: (data) => dispatch(postBulkSchedule(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
