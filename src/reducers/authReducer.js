import * as types from '../constants/actionTypes';

export default function auth(state = {
  isAuthenticated: false,
  id: undefined,
  username: undefined,
  token: undefined
}, action) {

  switch (action.type) {

    case types.LOGIN__COMPLETED: {
      const { id, username, token } = action.payload;
      return Object.assign({}, state, {
        isAuthenticated: true,
        id,
        username,
        token
      });
    }


    case types.LOGOUT__COMPLETED: {
      return Object.assign({}, state, {
        isAuthenticated: false,
        id: undefined,
        username: undefined,
        token: undefined
      });
    }


    default: {
      // console.log('authReducer hit default', action.type);
      return state;
    }
  }


}
