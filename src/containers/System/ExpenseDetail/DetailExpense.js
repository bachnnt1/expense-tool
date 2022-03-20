import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailExpense.scss";
import DataTable from "react-data-table-component";
import ModalExpense from "./ModalExpense";
import {
  createEstimatedExpenseAction,
} from "../../../store/actions/adminActions";
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
class DetailExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      listDetailExpended: []
    };
  }
  removeEstimatedExpense = (id) => {
    console.log(id);
  }
  async componentDidMount() { }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listDetailExpended !== this.props.listDetailExpended) {
      let listEstimatedExpenseShow = [];
      this.props.listDetailExpended.forEach((item, index) => {
        listEstimatedExpenseShow.push({
          id: index,
          invoiceNo: item.invoiceNo,
          detailExpenses: item.detailExpenses,
          supplier: item.supplier,
          invoiceDate: item.invoiceDate,
          fundingSource: item.fundingSource,
          projectCode: item.projectCode,
          donor: item.donor,
          amount: item.amount,
        });
      });
      this.setState({
        listEstimatedExpenseShow: [...listEstimatedExpenseShow]
      });
    }
  }
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
    this.props.createEstimatedExpenseAction(data);
  }
  toogleUserModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  render() {
    let { listEstimatedExpenseShow } = this.state;
    return (
      <>
        <div className="head">
          <label>Expense Detail </label>
          <button className="primary-button" onClick={this.handleAddNewExpense}>+ Add new</button>
        </div>
        <div className="result">
          <DataTable columns={columns} data={listEstimatedExpenseShow} pagination />
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
  return {
    listDetailExpended: state.admin.listEstimatedExpense
  };
};

const mapDispatchToProps = (dispatch) => {
  return { createEstimatedExpenseAction: (data) => dispatch(createEstimatedExpenseAction(data)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailExpense);
