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


  it('can handle REQUEST__FINISHED', () => {

    let state = {
      sendingRequest: true,
      inProgress: ['some.saga']
    };

    let action = {
      type: REQUEST__FINISHED,
      payload: {
        requestFrom: 'some.saga'
      }
    };

    expect(request(state, action)).toEqual({
      sendingRequest: false,
      inProgress: []
    });

  });


  it('can handle multiple instances of REQUEST__FINISHED', () => {

    let state = {
      sendingRequest: true,
      inProgress: ['some.saga', 'another.saga']
    };

    let action = {
      type: REQUEST__FINISHED,
      payload: {
        requestFrom: 'another.saga'
      }
    };

    let newState = request(state, action);

    expect(newState).toEqual({
      sendingRequest: true,
      inProgress: ['some.saga']
    });

    action = {
      type: REQUEST__FINISHED,
      payload: {
        requestFrom: 'some.saga'
      }
    };

    newState = request(newState, action);

    expect(newState).toEqual({
      sendingRequest: false,
      inProgress: []
    });

  });

});
