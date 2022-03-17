import { Component } from "react";
import { connect } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./About.scss";
class About extends Component {
  render() {
    return (
      <div className="section-about">
        <div className="section-about-header">Truyền thông nói về BachNNT</div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="440px"
              src="https://www.youtube.com/embed/YMrJ8p4zlOc"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <div className="img img1"></div>
            <div className="img img2"></div>
            <div className="img img3"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
