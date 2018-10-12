import * as ApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const signup = (user) => {
  return dispatch => {
    return ApiUtil.signup(user).then(user => {
      return dispatch({type: RECEIVE_CURRENT_USER, user:user });
    },
    errors => {
      return dispatch({type:RECEIVE_SESSION_ERRORS, errors: errors.responseJSON });
    }
  );
  };
};

export const login = (user) => {

  return dispatch => {
    return ApiUtil.login(user).then(user => {
      return dispatch({type: RECEIVE_CURRENT_USER, user:user});
    },
    errors => {
      return dispatch({type:RECEIVE_SESSION_ERRORS, errors: errors.responseJSON}); // , errors: {…}}
    });
  };
};
// {type:CLEAR_ERRORS}, // Can I dispatch two actions in thunk?

export const logout = () => {
  return dispatch => {
    return ApiUtil.logout().then(() => {
      dispatch({type: CLOSE_MODAL});
      dispatch({type: LOGOUT_CURRENT_USER});
    });
  };
};

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});
