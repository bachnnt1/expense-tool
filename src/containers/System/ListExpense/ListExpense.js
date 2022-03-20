import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import Select from "react-select";
import "./ListExpense.scss";
function doEdit(record) {
  window.location.replace('http://' + window.location.hostname + ':' + '3000' + '/edit-view?record=' + JSON.stringify(record));
}
const columns = [
  {
    name: "id",
    selector: (row) => row.id,    
  },
  {
    name: "bank",
    selector: (row) => row.bank,    
  },
  {
    name: "accountNo",
    selector: (row) => row.accountNo,    
  },
  {
    name: "advantageReq",
    selector: (row) => row.advantageReq,    
  },
  {
    name: "listEstimatedExpense",
    selector: (row) => row.listEstimatedExpense,    
  },
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
        classNames: ['expense-custom-class edit-button'],
      }
    ],
  },
];
class ListExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: "",
      listOptionClaimant: [{
        label: 'Nguyễn Thái Bảo', value: 'Nguyễn Thái Bảo'
      },
      {
        label: 'Messi', value: 'Messi'
      },
      {
        label: 'CR7', value: 'CR7'
      }],
      listOptionDepartment: [{
        label: 'FPT', value: 'fpt'
      },
      {
        label: 'Viettel', value: 'Viettel'
      }],
      listOptionType: [{
        label: 'Fund transfer request', value: 'Fund transfer request'
      },
      {
        label: 'Expense claim', value: 'Expense claim'
      }],
      listOptionStatus: [{
        label: 'Inprogress', value: 'Inprogress'
      },
      {
        label: 'Done', value: 'Done'
      }],
      selectedClaimant: "",
      selectedDepartment: "",
      selectedType: "",
      selectedStatus: "",
      listExpenseClaim: [],
      listExpenseClaimView: [],
    };
  }
  componentDidMount() {
    this.setState({
      listExpenseClaim: this.props.listExpenseClaim,
      listExpenseClaimView: this.props.listExpenseClaim,
      lstTemp: this.props.listExpenseClaim
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listExpenseClaim !== this.props.listExpenseClaim) {
      this.setState({
        listExpenseClaim: this.props.listExpenseClaim,
        listExpenseClaimView: this.props.listExpenseClaimView,
        lstTemp: this.props.listExpenseClaim
      });
    }
  }
  handleOnChangeDate = (event) => {
    this.setState({
      currentDate: event.target.value,
    }, () => {
      let {
        currentDate, listExpenseClaim
      } = this.state;
      let lstTemp = listExpenseClaim.filter(item => item.date === currentDate);
      this.setState({
        listExpenseClaimView: lstTemp
      });
    });
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event;
    this.setState({ ...copyState }, () => {
      let {
        selectedClaimant,
        selectedDepartment,
        selectedType,
        selectedStatus,
        lstTemp
      } = this.state;
      if (selectedClaimant) {
        lstTemp = lstTemp.filter(item => selectedClaimant.value === item.claimant);
      }
      if (selectedDepartment) {
        lstTemp = lstTemp.filter(item => selectedDepartment.value === item.department);
      }
      if (selectedType) {
        lstTemp = lstTemp.filter(item => selectedType.value === item.type);
      }
      if (selectedStatus) {
        lstTemp = lstTemp.filter(item => selectedStatus.value === item.status);
      }
      this.setState({
        listExpenseClaimView: lstTemp
      });
    });
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
      listExpenseClaimView,
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
          <div className="result result-list">
            <DataTable columns={columns} data={listExpenseClaimView} pagination />
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

export default connect(mapStateToProps, mapDispatchToProps)(ListExpense);
