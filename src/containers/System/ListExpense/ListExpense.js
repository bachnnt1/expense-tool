import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import Select from "react-select";
import "./ListExpense.scss";
import {
  getListExpenseClaimAction,
} from "../../../store/actions/adminActions";
function doEdit(record) {
  window.location.replace('http://' + window.location.hostname + ':' + '3000' + '/edit-view')
}
const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: "Claimant",
    selector: (row) => row.claimant,
    sortable: true,
  },
  {
    name: "Department",
    selector: (row) => row.department,
    sortable: true,
  },
  {
    name: "Organization",
    selector: (row) => row.organization,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row) => row.type,
    sortable: true,
  },
  {
    name: "Amount claimed",
    selector: (row) => row.amount,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    conditionalCellStyles: [
      {
        when: row => row.status = 'Inprogress',
        classNames: ['expense-custom-class'],
      }
    ],
  },
  {
    name: "Actions",
    selector: (row) => row.action,
    cell: (record) => <button onClick={() => {
      doEdit(record)
    }}>Detail</button>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    conditionalCellStyles: [
      {
        when: row => row.action = 'Inprogress',
        classNames: ['expense-custom-class'],
      }
    ],
  },
];

class ListExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: "",
      listOptionClaimant: [],
      listOptionDepartment: [],
      listOptionType: [],
      listOptionStatus: [],
      selectedClaimant: "",
      selectedDepartment: "",
      selectedType: "",
      selectedStatus: "",
      listExpenseClaim: []
    };
  }
  componentDidMount() {
    this.props.getListExpenseClaimAction();
    this.setState({
      listExpenseClaim: this.props.listExpenseClaim
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listExpenseClaim !== this.props.listExpenseClaim) {
      this.setState({
        listExpenseClaim: this.props.listExpenseClaim
      });
    }
  }
  handleOnChangeDate = (event) => {
    this.setState({
      currentDate: event.target.value,
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
    event.currentTarget.placeholder = "Enter a Date";
  };
  doCreateExpense = () => {
    this.props.history.push("create-expense");
  };
  onEdit = (record) => {
    console.log(record);
  }
  render() {
    let {
      listOptionClaimant,
      selectedClaimant,
      listOptionDepartment,
      listOptionType,
      listOptionStatus,
      selectedDepartment,
      selectedType,
      selectedStatus,
      listExpenseClaim
    } = this.state;
    return (
      <>
        <div className="main-container">
          <div className="head">
            <h3>Expense claim list </h3>
            <button onClick={this.doCreateExpense} className="primary-button">
              Add new +
            </button>
          </div>
          <div className="input-section">
            <div className="input">
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
            <div className="input">
              <Select
                value={selectedClaimant}
                onChange={(event) =>
                  this.onChangeInput(event, "selectedClaimant")
                }
                options={listOptionClaimant}
                placeholder="Select Claimant"
              />
            </div>
            <div className="input">
              <Select
                value={selectedDepartment}
                onChange={(event) =>
                  this.onChangeInput(event, "selectedDepartment")
                }
                options={listOptionDepartment}
                placeholder="Select Department"
              />
            </div>
            <div className="input">
              <Select
                value={selectedType}
                onChange={(event) => this.onChangeInput(event, "selectedType")}
                options={listOptionType}
                placeholder="Select Type"
              />
            </div>
            <div className="input">
              <Select
                value={selectedStatus}
                onChange={(event) =>
                  this.onChangeInput(event, "selectedStatus")
                }
                options={listOptionStatus}
                placeholder="Select Status"
              />
            </div>
          </div>
          <div className="result">
            <DataTable columns={columns} data={listExpenseClaim} pagination />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { listExpenseClaim: state.admin.listExpenseClaim };
};

const mapDispatchToProps = (dispatch) => {
  return { getListExpenseClaimAction: () => dispatch(getListExpenseClaimAction()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListExpense);
