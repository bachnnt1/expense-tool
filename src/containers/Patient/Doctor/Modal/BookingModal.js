import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import "./BookingModal.scss";
import DatePicker from "../../../../components/Input/DatePicker";
import { getGender, postAppointmentAction } from "../../../../store/actions";
import { languages } from "../../../../utils";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenBookingModal: false,
      timeDetail: {},
      doctorId: this.props.doctorId,
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      gender: "",
      doctorIdState: this.props.doctorId,
      arrGender: [],
    };
  }
  async componentDidMount() {
    await this.props.getGender();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isOpenBookingModal !== this.props.isOpenBookingModal) {
      this.setState({
        isOpenBookingModal: this.props.isOpenBookingModal,
      });
    }
    if (prevProps.timeDetail !== this.props.timeDetail) {
      this.setState({
        timeDetail: this.props.timeDetail,
      });
    }
    if (prevProps.doctorId !== this.props.doctorId) {
      this.setState({
        doctorId: this.props.doctorId,
        doctorIdState: this.props.doctorId,
      });
    }
    if (prevProps.genders !== this.props.genders) {
      let genderRedux = this.props.genders;
      this.setState({
        arrGender: genderRedux,
        gender:
          genderRedux && genderRedux.data.length > 0
            ? genderRedux.data[0].keyMap
            : "",
      });
    }
  }
  noRefCheck = () => {
    this.props.toogleFromParent();
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    let valueInput = event.target.value;
    copyState[id] = valueInput;
    this.setState({
      ...copyState,
    });
  };
  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  handleSubmit = () => {
    let { timeDetail, doctorIdState } = this.state;
    let date = new Date(this.state.birthday).getTime();
    this.props.postAppointmentAction({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      birthday: date,
      gender: this.state.gender,
      doctorId: doctorIdState,
      timeType: timeDetail ? timeDetail.timeType : "",
      timeDetail: timeDetail,
    });
  };
  render() {
    let { isOpenBookingModal, timeDetail, doctorId, arrGender } = this.state;
    let { lang } = this.props;
    return (
      <div>
        <Modal
          isOpen={isOpenBookingModal}
          toggle={this.noRefCheck}
          size="sm"
          centered
          className="boundary"
        >
          <div className="modal-booking-container">
            <p className="title">Thông tin đặt lịch khám bệnh</p>
            <ProfileDoctor
              doctorId={doctorId}
              timeDetail={timeDetail}
              isShowDescription={false}
            />
            <div className="parent">
              <div className="content">
                <label> Họ tên</label>
                <input
                  type="text"
                  value={this.state.fullName}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "fullName")
                  }
                ></input>
              </div>
              <div className="content">
                <label> Số điện thoại</label>
                <input
                  type="phone"
                  value={this.state.phoneNumber}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "phoneNumber")
                  }
                ></input>
              </div>
            </div>
            <div className="parent">
              <div className="content">
                <label> Địa chỉ email</label>
                <input
                  type="text"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeInput(event, "email")}
                ></input>
              </div>
              <div className="content">
                <label> Địa chỉ liên hệ</label>
                <input
                  type="text"
                  value={this.state.address}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "address")
                  }
                ></input>
              </div>
            </div>
            <div className="parent">
              <div className="content-exam">
                <label> Lý do khám</label>
                <input
                  type="text"
                  value={this.state.reason}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "reason")
                  }
                ></input>
              </div>
            </div>
            <div className="parent parent-last">
              <div className="content">
                <label> Ngày sinh</label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  value={this.state.birthday}
                  minDate={new Date()}
                ></DatePicker>
              </div>
              <div className="content">
                <label> Giới tính</label>
                <select
                  id="inputState"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "gender")
                  }
                >
                  {arrGender &&
                    arrGender.data &&
                    arrGender.data.length &&
                    arrGender.data.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {lang === languages.VI ? item.valueVi : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="footer">
              <button className="accept" onClick={this.handleSubmit}>
                Xác nhận
              </button>
              <button onClick={this.noRefCheck}>Cancel</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGender: () => dispatch(getGender()),
    postAppointmentAction: (data) => dispatch(postAppointmentAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
