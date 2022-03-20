import React, { Component } from "react";
import { connect } from "react-redux";
import "./EditExpense.scss";
import DataTable from "react-data-table-component";
const columns = [
  {
    name: "Invoice No",
    selector: (row) => row.invoiceNo,
    sortable: true,
  },
  {
    name: "Detail Expenses",
    selector: (row) => row.detailExpenses,
    sortable: true,
  },
  {
    name: "Supplier",
    selector: (row) => row.supplier,
    sortable: true,
  },
  {
    name: "Invoice Date",
    selector: (row) => row.invoiceDate,
    sortable: true,
  },
  {
    name: "Funding Source Code",
    selector: (row) => row.fundingSource,
    sortable: true,
  },
  {
    name: "Project Code",
    selector: (row) => row.projectCode,
    sortable: true,
  },
  {
    name: "Donor Budget Line",
    selector: (row) => row.donor,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row) => row.amount,
    sortable: true,
  },
  {
    name: "Actions",
    selector: (row) => row.action,
    cell: () => <button>Delete</button>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
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
  doCancel = () => {
    this.props.history.push("list-view");
  }
  render() {
    let { expenseClaimEdit } = this.state;
    console.log(expenseClaimEdit);
    let listEstimatedExpense = [];
    if (expenseClaimEdit.listEstimatedExpense) {
      listEstimatedExpense = JSON.parse(expenseClaimEdit.listEstimatedExpense);
    }
    return (
      <>
        <div className="edit-boundary">
          <div className="left-content">
            <p className="title-section">Information</p>
            <div className="info-content">
              <div className="div-2">
                <div className="output-field">
                  <label>Category</label>
                  <p>{expenseClaimEdit.type}</p>
                </div>
                <div className="output-field">
                  <label>Organization</label>
                  <p>{expenseClaimEdit.organization}</p>
                </div>
              </div>
              <div className="div-3">
                <div className="output-field">
                  <label>Date</label>
                  <p>{expenseClaimEdit.date}</p>
                </div>
                <div className="output-field">
                  <label>Claimant</label>
                  <p>{expenseClaimEdit.claimant}</p>
                </div>
                <div className="output-field">
                  <label>Department</label>
                  <p>{expenseClaimEdit.department}</p>
                </div>
              </div>
              <div className="div-3">
                <div className="output-field">
                  <label>Float/advantage request</label>
                  <p>{expenseClaimEdit.advantageReq}</p>
                </div>
                <div className="output-field">
                  <label>Amount</label>
                  <p>{expenseClaimEdit.amount}</p>
                </div>
                <div className="output-field">
                  <label>Expense Content</label>
                  <p>{expenseClaimEdit.name}</p>
                </div>
              </div>
              <div className="div-3">
                <div className="output-field">
                  <label>Partner</label>
                  <p>-</p>
                </div>
                <div className="output-field">
                  <label>Bank</label>
                  <p>{expenseClaimEdit.bank}</p>
                </div>
                <div className="output-field">
                  <label>Account No</label>
                  <p>{expenseClaimEdit.accountNo}</p>
                </div>
              </div>
            </div>
            <div className="estimated-section">
              {listEstimatedExpense && listEstimatedExpense.length > 0 &&
                <DataTable columns={columns} data={listEstimatedExpense} pagination />
              }
            </div>
          </div>
          <div className="right-content">
            <p className="title-section">Review</p>
            <div className="info-content">
              <div className="output-field">
                <label>Status</label>
                <p>{expenseClaimEdit.status}</p>
              </div>
              <div className="output-field">
                <label>Author</label>
                <p>{expenseClaimEdit.claimant}</p>
              </div>
              <div className="output-field">
                <label>Last approver</label>
                <p>{expenseClaimEdit.claimant}</p>
              </div>
              <div className="output-field">
                <label>Owner</label>
                <p>{expenseClaimEdit.claimant}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="button-function">
            <button type="button" className="secondary-button" onClick={this.doCancel}>Print</button>
            <button type="button" className="primary-button" onClick={this.doCancel}>Edit</button>
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
