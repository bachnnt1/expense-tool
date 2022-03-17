import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileById } from "../../../store/actions";
import { languages } from "../../../utils";
import "./ProfileDoctor.scss";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
    };
  }
  async componentDidMount() {
    await this.props.getProfileById(this.props.doctorId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.profile !== this.props.profile) {
      this.setState({
        profile: this.props.profile,
      });
    }
  }
  renderTimeBooking = (timeDetail) => {
    if (timeDetail) {
      let { lang } = this.props;
      let timeTypeValue =
        lang === languages.VI
          ? timeDetail.timeTypeData.valueVi
          : timeDetail.timeTypeData.valueEn;
      let date =
        lang === languages.VI
          ? moment.unix(+timeDetail.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+timeDetail.date / 1000)
              .locale("en")
              .format("ddd - DD/MM/YYYY");
      return (
        <div>
          {date}
          <p>{timeTypeValue}</p>
        </div>
      );
    }
  };
  render() {
    let { profile } = this.state;
    let { lang, timeDetail, isShowDescription } = this.props;
    let name = "";
    if (
      profile &&
      profile.response &&
      profile.response.data &&
      profile.response.data.positionData
    ) {
      name =
        lang === languages.VI
          ? `${profile.response.data.positionData.valueVi} ${profile.response.data.firstName} ${profile.response.data.lastName}`
          : `${profile.response.data.positionData.valueEn} ${profile.response.data.lastName} ${profile.response.data.firstName}`;
    }
    return (
      <>
        <div className="intro-doctor">
          <div className="content-boundary">
            {profile && profile.response && profile.response.data && (
              <div
                className="content-left"
                style={{
                  backgroundImage: `url(${profile.response.data.image})`,
                }}
              ></div>
            )}
            {this.renderTimeBooking(timeDetail)}
          </div>
          {isShowDescription && (
            <div className="content-right">
              <p>{name}</p>
              {profile &&
                profile.response &&
                profile.response.data &&
                profile.response.data.Markdown &&
                profile.response.data.Markdown.description && (
                  <p>{profile.response.data.Markdown.description}</p>
                )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    profile: state.admin.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfileById: (id) => dispatch(getProfileById(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
