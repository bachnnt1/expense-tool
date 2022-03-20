import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import './ModalExpense.scss';
class ModalExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailExpenses: '',
      invoiceDate: '',
      invoiceNo: '',
      amount: '',
      supplier: '',
      selectedCurrency: "",
      listOptionCurrency: [
        { label: "VND", value: "VND" },
        { label: "USD", value: "USD" },
        { label: "EUR", value: "EUR" },
      ],
      listOptionFunding: [
        { label: "20000", value: "20000" },
        { label: "100000", value: "100000" },
        { label: "200000", value: "200000" },
      ],
      fundingSource: '',
      projectCode: '',
      listOptionProjectCode: [
        { label: "PRJ123", value: "PRJ123" },
        { label: "PRO222", value: "PRO222" },
        { label: "JAVA2", value: "JAVA2" },
      ],
      donor: '',
      listOptionDonor: [
        { label: "FPT", value: "FPT" },
        { label: "FACEBOOK", value: "FACEBOOK" },
        { label: "GOOGLE", value: "GOOGLE" },
      ],
    };
  }

  componentDidMount() { }
  noRefCheck = () => {
    this.props.toogleFromParent();
  };

  handleChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleAddNewExpense = () => {
    this.props.handleAddNewExpense(this.state);
    this.props.toogleFromParent();
    this.setState({
      detailExpenses: '',
      invoiceDate: '',
      invoiceNo: '',
      amount: '',
      supplier: '',
      selectedCurrency: "",
      fundingSource: '',
      projectCode: '',
      donor: '',
    });
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };
  onFocus = (event) => {
    event.currentTarget.type = "date";
  };
  onBlur = (event) => {
    event.currentTarget.type = "text";
    event.currentTarget.placeholder = "Select Date";
  };
  handleOnChangeDate = (event) => {
    this.setState({
      invoiceDate: event.target.value,
    });
  };
  render() {
    let { detailExpenses, invoiceNo, amount, supplier, selectedCurrency, listOptionCurrency,
      listOptionFunding, fundingSource, projectCode, listOptionProjectCode, donor, listOptionDonor } = this.state;
    const isFundingSuccess = fundingSource ? true : false;
    const isProjectSuccess = projectCode ? true : false;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.noRefCheck}
        size="sm"
        centered
        className="boundary"
      >
        <ModalHeader toggle={this.noRefCheck}>Create estimated expense</ModalHeader>
        <ModalBody>
          <div>
            <div className="input-row">
              <div className="input-field">
                <label>Expense Detail</label>
                <input
                  type="text"
                  value={detailExpenses}
                  onChange={(event) => this.onChangeInput(event, "detailExpenses")}
                ></input>
              </div>
            </div>
            <div className="input-row">
              <div className="input-field">
                <label>Invoice date</label>
                <input
                  className="date-input"
                  type="text"
                  onClick={(event) => this.onFocus(event)}
                  onBlur={(event) => this.onBlur(event)}
                  placeholder="Select date"
                  value={this.state.invoiceDate}
                  onChange={(event) => this.handleOnChangeDate(event)}
                ></input>
              </div>
              <div className="input-field">
                <label>Invoice No</label>
                <input type="text" value={invoiceNo} onChange={(event) => this.onChangeInput(event, "invoiceNo")} />
              </div>
            </div>
            <div className="input-row">
              <div className="input-field">
                <label>Supplier</label>
                <input type="text" value={supplier} onChange={(event) => this.onChangeInput(event, "supplier")} />
              </div>
              <div className="input-field">
                <label>Amount</label>
                <input type="text" value={amount} onChange={(event) => this.onChangeInput(event, "amount")} />
              </div>
            </div>
            <div className="input-row">
              <div className="left-content">
                <label>Currency</label>
                <select
                  required
                  value={selectedCurrency}
                  onChange={(event) =>
                    this.onChangeInput(event, "selectedCurrency")
                  }
                >
                  <option value="" disabled>
                    Currency
                  </option>
                  {listOptionCurrency &&
                    listOptionCurrency.length &&
                    listOptionCurrency.map((item, index) => {
                      return (
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="input-row">
              <div className="input-field">
                <label>Funding source code</label>
                <select
                  required
                  value={fundingSource}
                  onChange={(event) =>
                    this.onChangeInput(event, "fundingSource")
                  }
                >
                  <option value="" disabled>
                    Select funding source code
                  </option>
                  {listOptionFunding &&
                    listOptionFunding.length &&
                    listOptionFunding.map((item, index) => {
                      return (
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="input-field">
                <label>Project code</label>
                <select disabled={!isFundingSuccess}
                  required
                  value={projectCode}
                  onChange={(event) =>
                    this.onChangeInput(event, "projectCode")
                  }
                >
                  <option value="" disabled>
                    Select Project code
                  </option>
                  {listOptionProjectCode &&
                    listOptionProjectCode.length &&
                    listOptionProjectCode.map((item, index) => {
                      return (
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="input-row">
              <div className="left-content">
                <label>Donor budget line</label>
                <select
                  disabled={!isProjectSuccess}
                  required
                  value={donor}
                  onChange={(event) =>
                    this.onChangeInput(event, "donor")
                  }
                >
                  <option value="" disabled>
                    Select Donor budget line
                  </option>
                  {listOptionDonor &&
                    listOptionDonor.length &&
                    listOptionDonor.map((item, index) => {
                      return (
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="footer footer-expense">
            <div className="button-function">
              <button type="button" className="secondary-button" onClick={this.noRefCheck}>Cancel</button>
              <button type="button" className="primary-button" onClick={this.handleAddNewExpense}>Create</button>
            </div>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { listExpenseClaim: state.admin.listExpenseClaim, };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalExpense);
