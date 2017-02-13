import {loadState} from './localStorage';
import _ from 'lodash';

export const getBaseRequestConfig = () => {

  const state = loadState();

  const config = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (state && _.has(state, 'auth.token')) {
    config.headers.Authorization = `Bearer ${state.auth.token}`;
  }

  return config;
};
