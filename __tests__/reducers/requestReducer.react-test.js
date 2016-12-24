import request from '../../src/reducers/requestReducer';
import {SENDING_REQUEST} from '../../src/constants/actionTypes';


describe('Request Reducer', () => {

  it('has a default state', () => {
    expect(request(undefined, { type: 'unexpected'})).toEqual({
      sendingRequest: false
    });
  });

  it('can handle SENDING_REQUEST', () => {
    expect(request(undefined, {
      type: SENDING_REQUEST,
      payload: {
        sendingRequest: true
      }
    })).toEqual({
      sendingRequest: true
    });
  });

});
