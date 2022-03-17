import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "./ListExpense.scss";
import DataTable from 'react-data-table-component';
import { path } from "../../../utils";

const columns = [
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Date',
    selector: row => row.date,
    sortable: true,
  },
  {
    name: 'Claimant',
    selector: row => row.claimant,
    sortable: true,
  },
  {
    name: 'Department',
    selector: row => row.department,
    sortable: true,
  },
  {
    name: 'Organization',
    selector: row => row.organization,
    sortable: true,
  },
  {
    name: 'Type',
    selector: row => row.type,
    sortable: true,
  },
  {
    name: 'Amount claimed',
    selector: row => row.amount,
    sortable: true,
  },
  {
    name: 'Status',
    selector: row => row.status,
    sortable: true,
  },
  {
    name: 'Actions',
    selector: row => row.action,
    sortable: true,
  }
];

const data = [
  {
    id: 1,
    name: 'Beetlejuice',
    date: '1988',
    claimant: 'a',
    department: 'd',
    organization: 'c',
    type: 'd',
    amount: 'e',
    status: 'f',
    action: 'g',
  },
  {
    id: 1,
    name: 'Beetlejuice',
    date: '1988',
    claimant: 'a',
    department: 'd',
    organization: 'c',
    type: 'd',
    amount: 'e',
    status: 'f',
    action: 'g',
  },
  {
    id: 1,
    name: 'Beetlejuice',
    date: '1988',
    claimant: 'a',
    department: 'd',
    organization: 'c',
    type: 'd',
    amount: 'e',
    status: 'f',
    action: 'g',
  },
  {
    id: 1,
    name: 'Beetlejuice',
    date: '1988',
    claimant: 'a',
    department: 'd',
    organization: 'c',
    type: 'd',
    amount: 'e',
    status: 'f',
    action: 'g',
  },
  {
    id: 1,
    name: 'Beetlejuice',
    date: '1988',
    claimant: 'a',
    department: 'd',
    organization: 'c',
    type: 'd',
    amount: 'e',
    status: 'f',
    action: 'g',
  },
  {
    id: 1,
    name: 'Beetlejuice',
    date: '1988',
    claimant: 'a',
    department: 'd',
    organization: 'c',
    type: 'd',
    amount: 'e',
    status: 'f',
    action: 'g',
  },
  {
    id: 1,
    name: 'Beetlejuice',
    date: '1988',
    claimant: 'a',
    department: 'd',
    organization: 'c',
    type: 'd',
    amount: 'e',
    status: 'f',
    action: 'g',
  },
  {
    id: 1,
    name: 'Beetlejuice',
    date: '1988',
    claimant: 'a',
    department: 'd',
    organization: 'c',
    type: 'd',
    amount: 'e',
    status: 'f',
    action: 'g',
  },
  {
    id: 1,
    name: 'Beetlejuice',
    date: '1988',
    claimant: 'a',
    department: 'd',
    organization: 'c',
    type: 'd',
    amount: 'e',
    status: 'f',
    action: 'g',
  },
  {
    id: 1,
    name: 'Beetlejuice',
    date: '1988',
    claimant: 'a',
    department: 'd',
    organization: 'c',
    type: 'd',
    amount: 'e',
    status: 'f',
    action: 'g',
  },


]
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
      selectedStatus: ""
    };
  }

  async componentDidMount() {
  }
  componentDidUpdate(prevProps, prevState, snapshot) {

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
    console.log('here');
  };
  onBlur = (event) => {
    event.currentTarget.type = "text";
    event.currentTarget.placeholder = "Enter a Date";
  };
  doCreateExpense = () => {
    this.props.history.push('create-expense');
  }
  render() {
    let { listOptionClaimant, selectedClaimant, listOptionDepartment, listOptionType,
      listOptionStatus, selectedDepartment, selectedType, selectedStatus } = this.state;
    return (
      <>
        <div className="main-container">
          <div className="head">
            <h3>Expense claim list </h3>
            <button onClick={this.doCreateExpense} className="primary-button">Add new +</button>
          </div>
          <div className="input-section">
            <div className="input">
              <input className="date-input" type="text" onClick={(event) => this.onFocus(event)} onBlur={(event) => this.onBlur(event)} placeholder="Date"
                value={this.state.currentDate} onChange={(event) => this.handleOnChangeDate(event)}></input>
            </div>
            <div className="input">
              <Select
                value={selectedClaimant}
                onChange={(event) => this.onChangeInput(event, 'selectedClaimant')}
                options={listOptionClaimant}
                placeholder="Select Claimant"
              />
            </div>
            <div className="input">
              <Select
                value={selectedDepartment}
                onChange={(event) => this.onChangeInput(event, 'selectedDepartment')}
                options={listOptionDepartment}
                placeholder="Select Department"
              />
            </div>
            <div className="input">
              <Select
                value={selectedType}
                onChange={(event) => this.onChangeInput(event, 'selectedType')}
                options={listOptionType}
                placeholder="Select Type"
              />
            </div>
            <div className="input">
              <Select
                value={selectedStatus}
                onChange={(event) => this.onChangeInput(event, 'selectedStatus')}
                options={listOptionStatus}
                placeholder="Select Status"
              />
            </div>
          </div><div className="result">
            <DataTable
              columns={columns}
              data={data}
              pagination
            />
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListExpense);
