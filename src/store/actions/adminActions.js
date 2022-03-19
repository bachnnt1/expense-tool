import actionTypes from "./actionTypes";

export const createEstimatedExpenseAction = (data) => ({
  type: actionTypes.CREATE_ESTIMATED_EXPENSE,
  data: data,
});

export const createExpenseClaimAction = (data) => ({
  type: actionTypes.CREATE_EXPENSE_CLAIM,
  data: data,
});

export const getListExpenseClaimAction = () => ({
  type: actionTypes.GET_LIST_EXPENSE_CLAIM
});
