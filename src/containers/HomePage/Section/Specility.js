import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getAllSpecialtyAction } from "../../../store/actions";
import { withRouter } from "react-router";
import "./Specialty.scss";
class Specility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrSpecialties: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allSpecialties !== this.props.allSpecialties) {
      this.setState({
        arrSpecialties: this.props.allSpecialties,
      });
    }
  }
  componentDidMount() {
    this.props.getAllSpecialtyAction();
  }
  handleViewDetailSpecialty = (spe) => {
    this.props.history.push(`/detail-specialty/${spe.id}`);
  };
  render() {
    let { arrSpecialties } = this.state;
    return (
      <div className="section-specialty hightlight">
        <div className="special-content">
          <div className="special-header">
            <span>Chuyên khoa phổ biến</span>
            <button>Xem thêm</button>
          </div>
          <div className="body">
            <Slider {...this.props.settings}>
              {arrSpecialties &&
                arrSpecialties.infor &&
                arrSpecialties.infor.data.length > 0 &&
                arrSpecialties.infor.data.map((item, index) => {
                  return (
                    <div
                      className="img-customize"
                      key={index}
                      onClick={() => this.handleViewDetailSpecialty(item)}
                    >
                      <div
                        className="bg-image bg-image-speciality"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div>{item.name}</div>
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
  return { allSpecialties: state.admin.allSpecialties };
};

const mapDispatchToProps = (dispatch) => {
  return { getAllSpecialtyAction: () => dispatch(getAllSpecialtyAction()) };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specility)
);
