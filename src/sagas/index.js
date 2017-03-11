import {fork} from 'redux-saga/effects';
import * as authSaga from './auth.saga';
import * as profileSaga from './profile.saga';
import * as registrationSaga from './register.saga';

export default function *rootSaga() {
  yield [
    fork(authSaga.watchLogin),
    fork(authSaga.watchLoginSucceeded),
    fork(authSaga.watchLoginFailed),

    fork(authSaga.watchLogoutRequested),

    fork(profileSaga.watchChangePassword),
    fork(profileSaga.watchChangePasswordSucceeded),
    fork(profileSaga.watchChangePasswordFailed),
    fork(profileSaga.watchRequestProfile),

    fork(registrationSaga.watchRequestRegistration),
    fork(registrationSaga.watchRegistrationFailed),
    fork(registrationSaga.watchRegistrationSuccess),
  ];
}
