import request from '../../src/reducers/requestReducer';
import {REQUEST__STARTED, REQUEST__FINISHED} from '../../src/constants/actionTypes';


describe('Request Reducer', () => {

  it('has a default state', () => {
    expect(request(undefined, { type: 'unexpected'})).toEqual({
      sendingRequest: false,
      inProgress: []
    });
  });

  it('can handle REQUEST__STARTED', () => {

    let action = {
      type: REQUEST__STARTED,
      payload: {
        requestFrom: 'some.saga'
      }
    };

    expect(request(undefined, action)).toEqual({
      sendingRequest: true,
      inProgress: ['some.saga']
    });
  });

  it('can handle multiple instances of REQUEST__STARTED', () => {

    let action = {
      type: REQUEST__STARTED,
      payload: {
        requestFrom: 'some.saga'
      }
    };

    let newState = request(undefined, action);

    expect(newState).toEqual({
      sendingRequest: true,
      inProgress: ['some.saga']
    });

    action = {
      type: REQUEST__STARTED,
      payload: {
        requestFrom: 'another.saga'
      }
    };

    newState = request(newState, action);

    expect(newState).toEqual({
      sendingRequest: true,
      inProgress: ['some.saga', 'another.saga']
    });
  });

});
