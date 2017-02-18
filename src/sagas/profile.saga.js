import * as api from '../connectivity/api.profile';
import {call, put} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import * as types from '../constants/actionTypes';


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

    const responseBody = yield call(api.changePassword, userId, currentPassword, newPassword, newPasswordRepeated)

    yield put({
      type: types.CHANGE_PASSWORD__SUCCEEDED,
      payload: {
        message: responseBody
      }
    })

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
        requestFrom: REQUESTS.PROFILE__DOCHANGEPASSWORD__SAGA
      }
    });

  }
}

export function *watchChangePassword() {
  yield* takeLatest(types.CHANGE_PASSWORD__REQUESTED, doChangePassword);
}
