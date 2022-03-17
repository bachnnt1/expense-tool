import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { getListPatientAction } from "../../../store/actions/adminActions";
class managePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      listPatient: {},
      userInfo: {},
    };
  }
  async componentDidMount() {
    let { userInfo } = this.props;
    let id = userInfo ? userInfo.id : -1;
    let { currentDate } = this.state;
    let date = new Date(currentDate).getTime();
    await this.props.getListPatientAction(id, date);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listPatient !== this.props.listPatient) {
      this.setState({
        listPatient: this.props.listPatient,
      });
    }
  }
  handleOnChangeDate = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        let { userInfo } = this.props;
        let id = userInfo ? userInfo.id : -1;
        let { currentDate } = this.state;
        let date = new Date(currentDate).getTime();
        await this.props.getListPatientAction(id, date);
      }
    );
  };
  handleConfirm = () => {};
  handleSendTicket = () => {};
  render() {
    let { listPatient } = this.state;
    console.log(listPatient);
    return (
      <>
        <div className="manage-container">
          <div className="title">Quản lý bệnh nhân</div>
          <div className="input">
            <label>Chọn ngày</label>
            <DatePicker
              onChange={this.handleOnChangeDate}
              value={this.state.currentDate}
              minDate={new Date()}
            ></DatePicker>
          </div>
          <div className="result-table">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Thời gian</th>
                  <th>Họ tên</th>
                  <th>Giới tính</th> 
                </tr>
              </thead>
              <tbody>
                {listPatient &&
                  listPatient.infor &&
                  listPatient.infor.data &&
                  listPatient.infor.data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <th>{item.timeRefData.valueEn}</th>
                        <th>{item.patientData.firstName}</th>
                        <th>{item.patientData.genderData.valueVi}</th>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    listPatient: state.admin.listPatient,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListPatientAction: (id, date) =>
      dispatch(getListPatientAction(id, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(managePatient);
