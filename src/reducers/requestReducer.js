import {REQUEST__STARTED, REQUEST__FINISHED} from '../constants/actionTypes';

export default function request(state = {
  sendingRequest: false,
  inProgress: []
}, action) {

  switch (action.type) {

    case REQUEST__STARTED: {

      state.inProgress.push(action.payload.requestFrom);

      return Object.assign({}, state, {
        sendingRequest: true,
        inProgress: state.inProgress
      });
    }

    default: {
      return state;
    }
  }
}
