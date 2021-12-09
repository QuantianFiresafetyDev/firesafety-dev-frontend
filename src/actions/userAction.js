import * as types from '../actionTypes/index';
import axios from 'axios';
import { API_URL_BASE } from '../utils/constant';

export const initiateAddUsers = () => {
  // const dispatch = useDispatch()
  return dispatch => {
    axios
      .get(`${API_URL_BASE}/user/allemployees`)
      .then(response => {
        console.log(response.data);
        dispatch(addUsers(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export function setLoginData(value) {
  return {
    type: types.USER_LOGIN_SUCCESS,
    payload: value,
  };
}

export function addUsers(value) {
  return {
    type: types.ADD_USERS,
    payload: value,
  };
}

export function logout() {
  return {
    type: types.LOGOUT,
  };
}
