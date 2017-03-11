import {
  ADD_NOTIFICATION
} from '../constants/actionTypes';

export default function notification(state = {}, action) {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      const {message, level} = action.payload;
      return Object.assign({}, state, {
        message,
        level
      });
    }

    default:
      // console.debug('notification reducer :: hit default', action.type);
      return state;
  }
}
