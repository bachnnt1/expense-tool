import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./TopDoctor.scss";
import * as action from "../../../store/actions";
import { languages } from "../../../utils";
import { withRouter } from "react-router";
class TopDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidMount() {
    this.props.loadTopDoctors();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({ arrDoctors: this.props.topDoctorsRedux });
    }
  }
  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };
  render() {
    let { arrDoctors } = this.state;
    return (
      <div className="section-specialty hightlight">
        <div className="special-content">
          <div className="special-header">
            <span>Bác sĩ nổi bật tuần qua</span>
            <button>Tìm kiếm</button>
          </div>
          <div className="body">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.data &&
                arrDoctors.data.length > 0 &&
                arrDoctors.data.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;
                  return (
                    <div
                      className="img-customize-doctor"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div
                        className="bg-image bg-image-doctor"
                        style={{ backgroundImage: `url(${imageBase64})` }}
                      />
                      <div>
                        {this.props.lang === languages.VI ? nameVi : nameEn}
                      </div>
                      <div>Chuyên khoa thể chất</div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topDoctorsRedux: state.admin.topDoctors,
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(action.getTopDoctorAction()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TopDoctor)
);
