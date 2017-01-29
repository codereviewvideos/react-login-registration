import asyncFetch from './async-fetch';
import {getBaseRequestConfig} from './baseRequestConfig';

export async function login(username, password) {

  /* global API_BASE_URL */
  const url = API_BASE_URL + '/login';

  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    })
  });

  const response = await asyncFetch(url, requestConfig);

  return await response.json();
}
