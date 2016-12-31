import {REQUEST__STARTED, REQUEST__FINISHED} from '../constants/actionTypes';

export default function request(state = {
  sendingRequest: false,
  inProgress: []
}, action) {

  switch (action.type) {

    case REQUEST__STARTED: {
      return Object.assign({}, state, {
        sendingRequest: true,
        inProgress: state.inProgress.concat([action.payload.requestFrom])
      });
    }

    case REQUEST__FINISHED: {

      let stillInProgress = state.inProgress.filter((item) => item !== action.payload.requestFrom);

      return Object.assign({}, state, {
        sendingRequest: stillInProgress.length > 0,
        inProgress: stillInProgress
      });
    }

    default: {
      return state;
    }
  }
}
