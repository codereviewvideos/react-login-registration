import * as api from '../connectivity/api.auth';
import {call, put} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import jwtDecode from 'jwt-decode';
import {push} from 'react-router-redux';
import * as types from '../constants/actionTypes';

export function *doLogin(action) {

  try {

    yield put({
      type: types.REQUEST__STARTED,
      payload: {
        requestFrom: 'authSaga.doLogin'
      }
    });

    const {username, password} = action.payload;

    const responseBody = yield call(api.login, username, password);

    if (typeof responseBody.token === "undefined") {
      throw new Error('Unable to find JWT in response body');
    }

    yield put({
      type: types.LOGIN__SUCCEEDED,
      payload: {
        idToken: responseBody.token
      }
    });

  } catch (e) {

    yield put({
      type: types.LOGIN__FAILED,
      payload: {
        message: e.message,
        statusCode: e.statusCode
      }
    });

  } finally {

    yield put({
      type: types.REQUEST__FINISHED,
      payload: {
        requestFrom: 'authSaga.doLogin'
      }
    });

  }
}


export function *watchLogin() {
  yield takeLatest(types.LOGIN__REQUESTED, doLogin);
}







export function *doLoginSucceeded(action) {

  const {idToken} = action.payload;

  const {id, username} = yield call(jwtDecode, idToken);

  yield put({
    type: types.LOGIN__COMPLETED,
    payload: {
      id,
      username,
      token: idToken
    }
  });

}


export function *watchLoginSucceeded() {
  yield takeLatest(types.LOGIN__SUCCEEDED, doLoginSucceeded);
}





export function *doLoginFailed() {

}

export function *watchLoginFailed() {
  yield takeLatest(types.LOGIN__FAILED, doLoginFailed);
}




export function *doLogoutRequested() {
  yield put({
    type: types.LOGOUT__COMPLETED
  });

  // redirect to /
  yield put(
    push('/')
  );
}

export function *watchLogoutRequested() {
  yield takeLatest(types.LOGOUT__REQUESTED, doLogoutRequested);
}
