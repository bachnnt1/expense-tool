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


export const getExpenseByIdAction = (id) => ({
  type: actionTypes.GET_EXPENSE_CLAIM_BY_ID,
  id: id
});

export const resetListExpendedDetailAction = () => ({
  type: actionTypes.RESET_LIST_EXPENDED_DETAIL
});