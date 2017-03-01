import * as api from '../connectivity/api.profile';
import {call, put} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import * as types from '../constants/actionTypes';
import {stopSubmit} from 'redux-form';
import formErrorHelper from '../helpers/formErrorHelper';


export const REQUESTS = {
  PROFILE__DOREQUESTPROFILE__SAGA: 'profile.doRequestProfile.saga',
  PROFILE__DOCHANGEPASSWORD__SAGA: 'profile.doChangePassword.saga',
};


export function *doRequestProfile(action) {

  try {

    const {userId} = action.payload;

    yield put({
      type: types.REQUEST__STARTED,
      payload: {
        requestFrom: REQUESTS.PROFILE__DOREQUESTPROFILE__SAGA
      }
    });

    const responseBody = yield call(api.fetchProfile, userId);

    const {username, email} = responseBody;

    yield put({
      type: types.PROFILE__REQUESTED__SUCCEEDED,
      payload: {
        id: userId,
        username,
        email
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

  } finally {

    yield put({
      type: types.REQUEST__FINISHED,
      payload: {
        requestFrom: REQUESTS.PROFILE__DOREQUESTPROFILE__SAGA
      }
    });

  }

}

export function *watchRequestProfile() {
  yield* takeLatest(types.PROFILE__REQUESTED, doRequestProfile);
}






export function *doChangePassword(action) {

  try {

    const {userId, currentPassword, newPassword, newPasswordRepeated} = action.payload;

    yield put({
      type: types.REQUEST__STARTED,
      payload: {
        requestFrom: REQUESTS.PROFILE__DOCHANGEPASSWORD__SAGA
      }
    });

    const responseBody = yield call(api.changePassword, userId, currentPassword, newPassword, newPasswordRepeated);

    yield put({
      type: types.CHANGE_PASSWORD__SUCCEEDED,
      payload: {
        message: responseBody
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
      type: types.CHANGE_PASSWORD__FAILED,
      payload: {
        response: e.response
      }
    });

  } finally {

    yield put({
      type: types.REQUEST__FINISHED,
      payload: {
        requestFrom: REQUESTS.PROFILE__DOCHANGEPASSWORD__SAGA
      }
    });

  }
}

export function *watchChangePassword() {
  yield* takeLatest(types.CHANGE_PASSWORD__REQUESTED, doChangePassword);
}



export function *doChangePasswordSucceeded(action) {
  yield put({
    type: types.ADD_NOTIFICATION,
    payload: {
      message: action.payload.message,
      level: 'success'
    }
  });

  // console.log('doChangePasswordSucceeded - would have added notification!', {
  //   message: action.payload.message,
  // });
}

export function *watchChangePasswordSucceeded() {
  yield *takeLatest(types.CHANGE_PASSWORD__SUCCEEDED, doChangePasswordSucceeded);
}






export function *doChangePasswordFailed(action) {

  // console.log('doChangePasswordFailed', action);
  const errorData = action.payload.response;

  const [currentPassword, newPassword, newPasswordRepeated] = [
    yield call(formErrorHelper, errorData, 'children.current_password.errors'),
    yield call(formErrorHelper, errorData, 'children.plainPassword.children.first.errors'),
    yield call(formErrorHelper, errorData, 'children.plainPassword.children.second.errors')
  ];

  yield put(stopSubmit('change-password', {
    currentPassword,
    newPassword,
    newPasswordRepeated,
  }));
}

export function *watchChangePasswordFailed() {
  yield *takeLatest(types.CHANGE_PASSWORD__FAILED, doChangePasswordFailed);
}
