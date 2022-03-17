import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import { verifyEmailAction } from "../../store/actions";
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSuccess: true,
      resVerifyEmail: {},
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.resVerifyEmail !== this.props.resVerifyEmail) {
      this.setState({
        resVerifyEmail: this.props.resVerifyEmail,
      });
    }
  }
  async componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location.search);
    const token = urlParams.get("token");
    const doctorId = urlParams.get("doctorId");
    if (token && doctorId) {
      let data = {
        token: token,
        doctorId: doctorId,
      };
      await this.props.verifyEmailAction(data);
      let { resVerifyEmail } = this.state;
      if (
        resVerifyEmail &&
        resVerifyEmail.infor &&
        resVerifyEmail.infor.errCode === 0
      ) {
        this.setState({
          isSuccess: true,
        });
      } else {
        this.setState({
          isSuccess: false,
        });
      }
    }
  }
  render() {
    let { isSuccess } = this.state;
    return (
      <>
        <HomeHeader></HomeHeader>
        {isSuccess ? (
          <div className="title">Xác nhận lịch hẹn thành công</div>
        ) : (
          <div className="title">Lịch hẹn không tồn tại, vui lòng thử lại</div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { resVerifyEmail: state.admin.resVerifyEmail };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyEmailAction: (data) => dispatch(verifyEmailAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
