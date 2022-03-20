import actionTypes from "../actions/actionTypes";

const initialState = {
  listEstimatedExpense: [],
  listExpenseClaim: []
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ESTIMATED_EXPENSE:
      return {
        ...state,
        listEstimatedExpense: [...state.listEstimatedExpense, action.data],
      };
    case actionTypes.CREATE_EXPENSE_CLAIM:
      return {
        ...state,
        listExpenseClaim: [...state.listExpenseClaim, action.data],
      };
    case actionTypes.GET_LIST_EXPENSE_CLAIM:
      return {
        ...state,
      };
    case actionTypes.RESET_LIST_EXPENDED_DETAIL:
      return {
        ...state,
        listEstimatedExpense: [],
      };
    default:
      return state;
  }
};

export default appReducer;
