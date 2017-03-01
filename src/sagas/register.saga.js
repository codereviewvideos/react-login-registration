import * as api from '../connectivity/api.register';
import {call, put} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import * as types from '../constants/actionTypes';
import {stopSubmit} from 'redux-form';
import formErrorHelper from '../helpers/formErrorHelper';


export const REQUESTS = {
  REGISTER__DOREGISTRATION__SAGA: 'profile.doRegistration.saga',
};


export function *doRegistration(action) {

  try {

    yield put({
      type: types.REQUEST__STARTED,
      payload: {
        requestFrom: REQUESTS.REGISTER__DOREGISTRATION__SAGA
      }
    });

    const {username, email, newPassword, newPasswordRepeated} = action.payload;

    const {msg, token} = yield call(api.register, username, email, newPassword, newPasswordRepeated);

    yield put({
      type: types.REGISTER__REQUEST__SUCCEEDED,
      payload: {
        token,
        message: msg
      }
    });

  } catch (e) {

    yield put({
      type: types.REQUEST__FAILED,
      payload: {
        message: e.message,
        statusCode: e.statusCode
      }
    });

    yield put({
      type: types.REGISTER__REQUEST__FAILED,
      payload: {
        response: e.response,
      }
    });

  } finally {

    yield put({
      type: types.REQUEST__FINISHED,
      payload: {
        requestFrom: REQUESTS.REGISTER__DOREGISTRATION__SAGA
      }
    });

  }

}

export function *watchRequestRegistration() {
  yield* takeLatest(types.REGISTER__REQUESTED, doRegistration);
}






export function *doRegistrationSuccess(action) {
  yield [
    put({
      type: types.ADD_NOTIFICATION,
      payload: {
        message: action.payload.message,
        level: 'success'
      }
    }),
    put({
      type: types.LOGIN__SUCCEEDED,
      payload: {
        idToken: action.payload.token
      }
    })
  ];
}


export function *watchRegistrationSuccess() {
  yield* takeLatest(types.REGISTER__REQUEST__SUCCEEDED, doRegistrationSuccess);
}





export function *doRegistrationFailed(action) {
  const errorData = action.payload.response;

  const [username, email, newPassword, newPasswordRepeated] = [
    yield call(formErrorHelper, errorData, 'children.username.errors'),
    yield call(formErrorHelper, errorData, 'children.email.errors'),
    yield call(formErrorHelper, errorData, 'children.plainPassword.children.first.errors'),
    yield call(formErrorHelper, errorData, 'children.plainPassword.children.second.errors')
  ];

  yield put(stopSubmit('registration-form', {
    username,
    email,
    newPassword,
    newPasswordRepeated
  }));
}


export function *watchRegistrationFailed() {
  yield* takeLatest(types.REGISTER__REQUEST__FAILED, doRegistrationFailed);
}
