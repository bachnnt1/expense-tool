import React, { Component } from "react";
import { connect } from "react-redux";
import "./CreateExpense.scss";
class CreateExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async componentDidMount() {
  }
  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  render() {
    return (
      <>
        Hello create expense
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateExpense);
