import React, { Component } from "react";
import { connect } from "react-redux";
import "./CreateExpense.scss";
import DetailExpense from "../ExpenseDetail/DetailExpense";
import ModalExpense from "../ExpenseDetail/ModalExpense";
class CreateExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: "",
      selectedCategory: "Expense claim",
      listOptionCategory: [{ label: "Expense claim", value: "Expense claim" }],
      listOptionClaimant: [],
      selectedClaimant: "",
      listOptionDepartment: [],
      selectedDepartment: "",
      listOptionAdvance: [],
      selectedAdvandeReq: "",
      claimAmount: 0,
      paymentMethod: '',
      selectedCurrency: "VND",
      listOptionCurrency: [
        { label: "VND", value: "VND" },
        { label: "USD", value: "USD" },
        { label: "EUR", value: "EUR" },
      ],
      expenseContent: "",
      selectedPayMethod: "",
      listOptionPayMethod: [{
        label: "AAV", value: "aav"
      },
      { label: "Claimant", value: "claimant" },
      ],
      isTransfer: true,
      accountNo: "",
      bank: "",
      amount: "",
      selectedFile: null,
      isDisplayPaymentMethod: false,
      isDisplayAmount: false,
    };
  }

  async componentDidMount() { }
  componentDidUpdate(prevProps, prevState, snapshot) { }
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
    event.currentTarget.placeholder = "Date";
  };
  handleOnChangeDate = (event) => {
    this.setState({
      currentDate: event.target.value,
    });
  };
  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };
  onChangeRadioButton = (event) => {
    this.setState({ paymentMethod: event.target.value });
  }
  render() {
    let {
      selectedCategory,
      listOptionCategory,
      listOptionClaimant,
      selectedClaimant,
      listOptionDepartment,
      selectedDepartment,
      listOptionAdvance,
      selectedAdvandeReq,
      claimAmount,
      selectedCurrency,
      listOptionCurrency,
      expenseContent,
      selectedPayMethod,
      listOptionPayMethod,
      isDisplayBankAndAccount,
      isDisplayAmount,
      accountNo,
      bank,
      amount,
      isDisplayPaymentMethod,
      paymentMethod
    } = this.state;
    isDisplayPaymentMethod = (selectedPayMethod === 'claimant') ? false : true;
    isDisplayBankAndAccount = ((selectedPayMethod === 'aav' && paymentMethod === 'transfer') || (selectedPayMethod === 'claimant')) ? true : false;
    isDisplayAmount = (selectedPayMethod === 'aav' && paymentMethod === 'cash') ? true : false;
    return (
      <>
        <div className="main-container container">
          <div className="head">
            <h3>Create Expense claim</h3>
          </div>
          <div>
            <div className="result-create">
              <label>Organization</label>
              <div className="radio-input">
                <div>
                  <input id="aav" name="org" type="radio" value="aav" />
                  <label htmlFor="aav">AAV</label>
                </div>
                <div>
                  <input id="afv" name="org" type="radio" value="afv" />
                  <label htmlFor="afv">AFV</label>
                </div>
              </div>
              <div className="input-row">
                <div className="input-field">
                  <label>Expense</label>
                  <input type="text"></input>
                </div>
                <div className="input-field">
                  <label>Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(event) =>
                      this.onChangeInput(event, "selectedCategory")
                    }
                  >
                    {listOptionCategory &&
                      listOptionCategory.length &&
                      listOptionCategory.map((item, index) => {
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
                  <label>Date</label>
                  <input
                    className="date-input"
                    type="text"
                    onClick={(event) => this.onFocus(event)}
                    onBlur={(event) => this.onBlur(event)}
                    placeholder="Date"
                    value={this.state.currentDate}
                    onChange={(event) => this.handleOnChangeDate(event)}
                  ></input>
                </div>
                <div className="input-field">
                  <label>Claimant</label>
                  <select
                    value={selectedClaimant}
                    onChange={(event) =>
                      this.onChangeInput(event, "selectedClaimant")
                    }
                  >
                    {listOptionClaimant &&
                      listOptionClaimant.length &&
                      listOptionClaimant.map((item, index) => {
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
                  <label>Department</label>
                  <select
                    required
                    value={selectedDepartment}
                    onChange={(event) =>
                      this.onChangeInput(event, "selectedDepartment")
                    }
                  >
                    <option value="" disabled>
                      Select department
                    </option>
                    {listOptionDepartment &&
                      listOptionDepartment.length &&
                      listOptionDepartment.map((item, index) => {
                        return (
                          <option key={index} value={item.value}>
                            {item.label}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="input-field">
                  <label>Float/advance request</label>
                  <select
                    required
                    value={selectedAdvandeReq}
                    onChange={(event) =>
                      this.onChangeInput(event, "selectedAdvandeReq")
                    }
                  >
                    <option value="" disabled>
                      Select float
                    </option>
                    {listOptionAdvance &&
                      listOptionAdvance.length &&
                      listOptionAdvance.map((item, index) => {
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
                  <div className="claim-amount">
                    <label>Total claim amount</label>
                    <div className="wrap-claim-amount">
                      <input
                        type="text"
                        value={claimAmount}
                        onChange={(event) =>
                          this.onChangeInput(event, "claimAmount")
                        }
                      ></input>
                      <select
                        value={selectedCurrency}
                        onChange={(event) =>
                          this.onChangeInput(event, "selectedCurrency")
                        }
                      >
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
                  <div className="pay-method">
                    <label>Pay to</label>
                    <select
                      required
                      value={selectedPayMethod}
                      onChange={(event) =>
                        this.onChangeInput(event, "selectedPayMethod")
                      }
                    >
                      <option value="" disabled>
                        Select Pay to
                      </option>
                      {listOptionPayMethod &&
                        listOptionPayMethod.length &&
                        listOptionPayMethod.map((item, index) => {
                          return (
                            <option key={index} value={item.value}>
                              {item.label}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="right-content">
                  <label>Expense content</label>
                  <textarea
                    value={expenseContent}
                    onChange={(event) =>
                      this.onChangeInput(event, "expenseContent")
                    }
                  ></textarea>
                </div>
              </div>
              {isDisplayPaymentMethod &&
                <>
                  <label className="label-radio">Payment method</label>
                  <div className="radio-input" onChange={this.onChangeRadioButton}>
                    <div>
                      <input
                        id="transfer"
                        name="payMethod"
                        type="radio"
                        value="transfer"
                      />
                      <label htmlFor="transfer">Transfer</label>
                    </div>
                    <div>
                      <input id="cash" name="payMethod" type="radio" value="cash" />
                      <label htmlFor="cash">Cash</label>
                    </div>
                  </div></>}

              {isDisplayBankAndAccount &&
                <div className="input-row">
                  <div className="input-field">
                    <label>Bank</label>
                    <input
                      type="text"
                      value={bank}
                      onChange={(event) => this.onChangeInput(event, "bank")}
                    ></input>
                  </div>
                  <div className="input-field">
                    <label>Account No</label>
                    <input
                      type="text"
                      value={accountNo}
                      onChange={(event) =>
                        this.onChangeInput(event, "accountNo")
                      }
                    ></input>
                  </div>
                </div>
              }
              {isDisplayAmount &&
                <div className="input-field">
                  <label>Amount</label>
                  <input
                    type="text"
                    value={amount}
                    onChange={(event) => this.onChangeInput(event, "amount")}
                  ></input>
                </div>
              }

              {/* Expanse detail */}
              <div>
                <DetailExpense />
              </div>
              {/* Upload file */}
              <div className="input-field upload-file">
                <label>Attchment</label>
                <div>
                  <label htmlFor="uploadFile">
                    <span>Choose a file</span> or drag it here
                  </label>
                  <input
                    id="uploadFile"
                    type="file"
                    onChange={this.onFileChange}
                    hidden
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="button-function">
            <button type="button" className="secondary-button">Cancel</button>
            <button type="button" className="primary-button">Create</button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateExpense);
