import { Component } from "react";
import { connect } from "react-redux";
import "./Guilde.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
class Guilde extends Component {
  render() {
    return (
      <div className="section-specialty">
        <div className="special-content">
          <div className="special-header">
            <span>Cẩm nang</span>
            <button>Tất cả bài viết</button>
          </div>
          <div className="body">
            <Slider {...this.props.settings}>
              <div className="img-customize-guilde">
                <div className="bg-image bg-image-guilde" />
                <div>
                  Phẫu thuật áp xe hậu môn: Cần lưu ý gì trước và sau khi mổ?
                  Cách chăm sóc vết mổ áp xe hậu môn
                </div>
              </div>
              <div className="img-customize-guilde">
                <div className="bg-image bg-image-guilde" />
                <div>
                  Phẫu thuật áp xe hậu môn: Cần lưu ý gì trước và sau khi mổ?
                  Cách chăm sóc vết mổ áp xe hậu môn
                </div>
              </div>
              <div className="img-customize-guilde">
                <div className="bg-image bg-image-guilde" />
                <div>
                  Phẫu thuật áp xe hậu môn: Cần lưu ý gì trước và sau khi mổ?
                  Cách chăm sóc vết mổ áp xe hậu môn
                </div>
              </div>
              <div className="img-customize-guilde">
                <div className="bg-image bg-image-guilde" />
                <div>
                  Phẫu thuật áp xe hậu môn: Cần lưu ý gì trước và sau khi mổ?
                  Cách chăm sóc vết mổ áp xe hậu môn
                </div>
              </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Guilde);
