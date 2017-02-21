import * as authSaga from '../../src/sagas/auth.saga';
import * as types from '../../src/constants/actionTypes';
import {call, put} from 'redux-saga/effects';
import * as api from '../../src/connectivity/api.auth';

describe('Auth Saga', () => {

  describe('doLogin', () => {

    it('has a happy path', () => {

      const generator = authSaga.doLogin({
        payload: {
          username: 'bob',
          password: 'testpass'
        }
      });

      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.REQUEST__STARTED,
          payload: {
            requestFrom: 'authSaga.doLogin'
          }
        })
      );


      expect(
        generator.next().value
      ).toEqual(
        call(api.login, 'bob', 'testpass')
      );


      let fakeResponseBody = { token: 'some-token' };

      expect(
        generator.next(fakeResponseBody).value
      ).toEqual(
        put({
          type: types.LOGIN__SUCCEEDED,
          payload: {
            idToken: 'some-token'
          }
        })
      );


      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.REQUEST__FINISHED,
          payload: {
            requestFrom: 'authSaga.doLogin'
          }
        })
      );


      expect(
        generator.next().done
      ).toBeTruthy();

    });


    it('throws when a call to api.login fails', () => {

      const generator = authSaga.doLogin({
        payload: {
          username: 'bob',
          password: 'testpass'
        }
      });

      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.REQUEST__STARTED,
          payload: {
            requestFrom: 'authSaga.doLogin'
          }
        })
      );

      expect(
        generator.next().value
      ).toEqual(
        call(api.login, 'bob', 'testpass')
      );

      expect(
        generator.throw({
          message: 'something went wrong',
          statusCode: 123,
        }).value
      ).toEqual(
        put({
          type: types.LOGIN__FAILED,
          payload: {
            message: 'something went wrong',
            statusCode: 123,
          }
        })
      );

      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.REQUEST__FINISHED,
          payload: {
            requestFrom: 'authSaga.doLogin'
          }
        })
      );

      expect(
        generator.next().done
      ).toBeTruthy();

    });

    it('throws if unable to find a token in the response.body', () => {

      const generator = authSaga.doLogin({
        payload: {
          username: 'bob',
          password: 'testpass'
        }
      });

      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.REQUEST__STARTED,
          payload: {
            requestFrom: 'authSaga.doLogin'
          }
        })
      );

      expect(
        generator.next().value
      ).toEqual(
        call(api.login, 'bob', 'testpass')
      );

      let fakeResponseBody = { bad: 'response' };

      expect(
        generator.next(fakeResponseBody).value
      ).toEqual(
        put({
          type: types.LOGIN__FAILED,
          payload: {
            message: 'Unable to find JWT in response body',
            statusCode: undefined
          }
        })
      );


      expect(
        generator.next().value
      ).toEqual(
        put({
          type: types.REQUEST__FINISHED,
          payload: {
            requestFrom: 'authSaga.doLogin'
          }
        })
      );

      expect(
        generator.next().done
      ).toBeTruthy();
    });

  });

});
