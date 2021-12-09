import { USER_LOGIN_FAIL, USER_LOGIN_SUCCESS , LOGOUT } from "actionTypes";

const intialState = {
  emp_id: '',
  firstname: '',
  lastname: '',
  token: '',
}

const user = (state = intialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      const userData = action.payload;
      return {
        ...state,
        ...userData
      }
    case USER_LOGIN_FAIL:
      return {
        ...state,
        ...intialState
      }
    case LOGOUT : 
      return intialState;
    default:
      return intialState;
  }
}

export default user;