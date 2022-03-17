import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specility from "./Section/Specility";
import MedicalFacility from "./Section/medicalFacility";
import TopDoctor from "./Section/TopDoctor";
import Guilde from "./Section/Guilde";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";
import "./HomePage.scss";
class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    let settingsGuilde = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
    return (
      <div>
        <HomeHeader isShowBanner={true}/>
        <Specility settings={settings} />
        <MedicalFacility settings={settings} />
        <TopDoctor settings={settings} />
        <Guilde settings={settingsGuilde} />
        <About />
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
