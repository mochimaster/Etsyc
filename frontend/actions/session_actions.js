import * as ApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const signup = (user) => {
  return dispatch => {
    return ApiUtil.signup(user).then(user => {
      return dispatch({type: RECEIVE_CURRENT_USER, user:user });
    });
  };
};

export const login = (user) => {

  return dispatch => {

    return ApiUtil.login(user).then(user => {

      return dispatch({type: RECEIVE_CURRENT_USER, user:user});
    });
  };
};

export const logout = () => {
  return dispatch => {
    return ApiUtil.logout().then(() => {
      return dispatch({type: LOGOUT_CURRENT_USER});
    });
  };
};

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});
