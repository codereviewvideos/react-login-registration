jest.mock('../../src/connectivity/async-fetch.js');

import * as api from '../../src/connectivity/api.auth';


describe('API Auth', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('login', () => {

    it('has a happy path', async () => {

      const asyncFetch = require('../../src/connectivity/async-fetch').default;
      asyncFetch.mockReturnValue({
        json: () => 'it worked!',
      });

      const response = await api.login('bob', 'testpass');
      expect(response).toEqual('it worked!');

      /* global API_BASE_URL */
      const expectedUrl = API_BASE_URL + '/login';
      const actualUrl = asyncFetch.mock.calls[0][0];
      expect(expectedUrl).toEqual(actualUrl);

      const expectedBody = JSON.stringify({
        username: 'bob',
        password: 'testpass',
      });
      const actualRequestConfig = asyncFetch.mock.calls[0][1];
      expect(expectedBody).toEqual(actualRequestConfig.body);

      expect(actualRequestConfig.method).toEqual('POST');

    });

  });

});
