import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createEstimatedExpenseAction
} from "../../../store/actions/adminActions";
import "./EditExpense.scss";

class EditExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() { }
  componentDidUpdate(prevProps, prevState, snapshot) {

  }
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };

  render() {
    return (
      <>
        Hello edit
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listDetailExpended: state.admin.listEstimatedExpense
  };
};

const mapDispatchToProps = (dispatch) => {
  return { createEstimatedExpenseAction: (data) => dispatch(createEstimatedExpenseAction(data)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);
