import * as api from '../connectivity/api.profile';
import {call, put} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import * as types from '../constants/actionTypes';


export const REQUESTS = {
  PROFILE__DOREQUESTPROFILE__SAGA: 'profile.doRequestProfile.saga',
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
