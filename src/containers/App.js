import { ConnectedRouter as Router } from "connected-react-router";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import { history } from "../redux";
import { path } from "../utils";
import CreateExpense from "./System/CreateExpense/CreateExpense";
import ListExpense from "./System/ListExpense/ListExpense";


class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <ConfirmModal />
            <div className="content-container">
              <Switch>
                <Route path={path.LIST_VIEW} component={ListExpense} />
                <Route path={path.CREATE_NEW_EXPENSE} component={CreateExpense} />
              </Switch>
            </div>
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
