import {
  PROFILE__REQUESTED__SUCCEEDED
} from '../constants/actionTypes';


export default function profile(state = {
  id: undefined,
  username: undefined,
  email: undefined
}, action) {

  switch (action.type) {

    case PROFILE__REQUESTED__SUCCEEDED: {
      const {id, username, email} = action.payload;
      return Object.assign({}, state, {
        id,
        username,
        email
      });
    }

    default:
      return state;
  }

}
