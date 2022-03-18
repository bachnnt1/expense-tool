import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailExpense.scss";
import DataTable from "react-data-table-component";
import ModalExpense from "./ModalExpense";
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
  },
];
const data = [
  {
    invoiceNo: 1,
    detailExpenses: "Beetlejuice",
    supplier: "1988",
    invoiceDate: "a",
    fundingSource: "d",
    projectCode: "c",
    donor: "d",
    amount: "e",
    action: "g",
  },
];
class DetailExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
    };
  }

  async componentDidMount() { }
  componentDidUpdate(prevProps, prevState, snapshot) { }
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };
  handleAddNewExpense = () => {
    this.setState({
      isOpenModal: true,
    });
  };
  handleAddNewExpenseDetail = (data) => {
    console.log(data);
  }
  toogleUserModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  render() {
    return (
      <>
        <div className="head">
          <label>Expense Detail </label>
          <button className="primary-button" onClick={this.handleAddNewExpense}>+ Add new</button>
        </div>
        <div className="result">
          <DataTable columns={columns} data={data} pagination />
        </div>
        <ModalExpense
          isOpen={this.state.isOpenModal}
          toogleFromParent={this.toogleUserModal}
          handleAddNewExpense={this.handleAddNewExpenseDetail}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailExpense);
