import {getBaseRequestConfig} from '../../src/connectivity/baseRequestConfig';

describe('Base Request Config', () => {

  it('returns a basic default config', () => {

    const result = getBaseRequestConfig();

    expect(result).toEqual({
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });

  });

});
