export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
// import {clearErrors} from 'session_actions';

export const openModal = modal => {
  return {
    type: OPEN_MODAL,
    modal
  };
};

export const closeModal = () => {
  // dispatch(clearErrors());
  return {
    type: CLOSE_MODAL,
  };
};
