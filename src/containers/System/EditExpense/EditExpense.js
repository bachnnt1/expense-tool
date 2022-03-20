import React, { Component } from "react";
import { connect } from "react-redux";
import "./EditExpense.scss";

class EditExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listExpenseClaim: [],
      expenseClaimEdit: {}
    };
  }

  componentDidMount() {
    let url = new URL(window.location.href);
    let record = url.searchParams.get("record");
    this.setState({
      expenseClaimEdit: JSON.parse(record)
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
  }
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };

  render() {
    let { expenseClaimEdit } = this.state;
    console.log(expenseClaimEdit);
    return (
      <>
        <div className="edit-boundary">
          <div className="left-content">
            <p>Information</p>
            <div className="info-content">
              <div className="div-2">
                <div className="output-field">
                  <label>Category</label>
                  <p></p>
                </div>
                <div className="output-field">
                  <label>Organization</label>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          <div className="right-content">
            <p>Review</p>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listExpenseClaim: state.admin.listExpenseClaim,
    listDetailExpended: state.admin.listEstimatedExpense
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);
