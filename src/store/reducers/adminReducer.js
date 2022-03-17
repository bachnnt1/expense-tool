import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  adminInfo: null,
  genders: [],
  role: [],
  position: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  detailDoctor: {},
  schedule: [],
  scheduleByDate: [],
  allRequiredInfo: [],
  profile: {},
  resVerifyEmail: {},
  resCreateSpecial: {},
  allSpecialties: [],
  allClinics: [],
  specialtyById: {},
  clinicById: {},
  listPatient: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        adminInfo: action.adminInfo,
      };
    case actionTypes.ADMIN_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        adminInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        adminInfo: null,
      };
    case actionTypes.GET_GENDER:
      return {
        ...state,
      };
    case actionTypes.GET_GENDER_SUCCESS:
      state.genders = action.genders;
      return {
        ...state,
      };
    case actionTypes.GET_GENDER_FAIL:
      return {
        state,
      };
    case actionTypes.GET_POSITION:
      return {
        ...state,
      };
    case actionTypes.GET_POSITION_SUCCESS:
      state.position = action.positions;
      return {
        ...state,
      };
    case actionTypes.GET_POSITION_FAIL:
      return {
        state,
      };
    case actionTypes.GET_ROLE:
      return {
        ...state,
      };
    case actionTypes.GET_ROLE_SUCCESS:
      state.role = action.roles;
      return {
        ...state,
      };
    case actionTypes.GET_ROLE_FAIL:
      return {
        state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.topDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAIL:
      return {
        state,
      };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAIL:
      state.users = [];
      return {
        state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctors = action.allDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAIL:
      state.allDoctors = [];
      return {
        state,
      };
    case actionTypes.GET_DETAIL_DOCTOR_SUCCESS:
      state.detailDoctor = action.detail;
      return {
        ...state,
      };
    case actionTypes.GET_DETAIL_DOCTOR_FAIL:
      state.detailDoctor = {};
      return {
        state,
      };
    case actionTypes.GET_ALLCODE_HOUR_SUCCESS:
      state.schedule = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_ALLCODE_HOUR_FAIl:
      state.schedule = [];
      return {
        state,
      };
    case actionTypes.GET_SCHEDULE_BY_TIME_SUCCESS:
      state.scheduleByDate = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_SCHEDULE_BY_TIME_FAIL:
      state.scheduleByDate = [];
      return {
        state,
      };
    case actionTypes.GET_REQUIRE_DOCTOR_INFO_SUCCESS:
      state.allRequiredInfo = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_REQUIRE_DOCTOR_INFO_FAIL:
      state.allRequiredInfo = [];
      return {
        state,
      };
    case actionTypes.GET_PROFILE_SUCCESS:
      state.profile = action.detail;
      return {
        ...state,
      };
    case actionTypes.GET_PROFILE_FAIL:
      state.profile = {};
      return {
        state,
      };
    case actionTypes.VERIFY_EMAIL_SUCCESS:
      state.resVerifyEmail = action.res;
      return {
        ...state,
      };
    case actionTypes.VERIFY_EMAIL_FAIL:
      state.resVerifyEmail = {};
      return {
        state,
      };
    case actionTypes.CREATE_SPECIALTY_SUCCESS:
      state.resCreateSpecial = action.res;
      return {
        ...state,
      };
    case actionTypes.CREATE_SPECIALTY_FAIL:
      state.resCreateSpecial = {};
      return {
        state,
      };

    case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
      state.allSpecialties = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_SPECIALTY_FAIL:
      state.allSpecialties = [];
      return {
        state,
      };
    case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
      state.allClinics = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_CLINIC_FAIL:
      state.allClinics = [];
      return {
        state,
      };
    case actionTypes.FETCH_SPECIALTY__ID_SUCCESS:
      state.specialtyById = action.detail;
      return {
        ...state,
      };
    case actionTypes.FETCH_SPECIALTY__ID_FAIL:
      state.specialtyById = {};
      return {
        state,
      };
    case actionTypes.FETCH_CLICNIC_ID_SUCCESS:
      state.clinicById = action.detail;
      return {
        ...state,
      };
    case actionTypes.FETCH_CLICNIC_ID_FAIL:
      state.clinicById = {};
      return {
        state,
      };
    case actionTypes.FETCH_LIST_PATIENT_ID_SUCCESS:
      state.listPatient = action.detail;
      return {
        ...state,
      };
    case actionTypes.FETCH_LIST_PATIENT_ID_FAIL:
      state.listPatient = {};
      return {
        state,
      };
    default:
      return state;
  }
};

export default appReducer;
