import {RECEIVE_CURRENT_USER} from '../actions/session_actions';


const usersReducer = (oldState={id:null}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {[action.user.id]: action.user};


    default:
      return oldState;

  }
};

export default usersReducer;
