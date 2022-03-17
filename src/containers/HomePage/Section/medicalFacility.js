import { Component } from "react";
import { connect } from "react-redux";
import "./medicalFacility.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getAllClinicAction } from "../../../store/actions";
import { withRouter } from "react-router";
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  componentDidMount() {
    this.props.getAllClinicAction();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allClinics !== this.props.allClinics) {
      this.setState({ dataClinics: this.props.allClinics });
    }
  }
  handleViewDetailClinic = (clinic) => {
    this.props.history.push(`/detail-clinic/${clinic.id}`);
  };
  render() {
    let { dataClinics } = this.state;
    return (
      <div className="section-specialty">
        <div className="special-content">
          <div className="special-header">
            <span>Cơ sở y tế nổi bật</span>
            <button>Tìm kiếm</button>
          </div>
          <div className="body">
            <Slider {...this.props.settings}>
              {dataClinics &&
                dataClinics.infor &&
                dataClinics.infor.data.length > 0 &&
                dataClinics.infor.data.map((item, index) => {
                  return (
                    <div
                      className="img-customize"
                      key={index}
                      onClick={() => this.handleViewDetailClinic(item)}
                    >
                      <div
                        className="bg-image bg-image-facility"
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
  return {
    isLoggedIn: state.user.isLoggedIn,
    allClinics: state.admin.allClinics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { getAllClinicAction: () => dispatch(getAllClinicAction()) };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
