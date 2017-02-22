import asyncFetch from './async-fetch';
import {getBaseRequestConfig} from './baseRequestConfig';

export async function register(username, email, password, passwordRepeated) {

  /* global API_BASE_URL */
  const url = API_BASE_URL + '/register';

  const requestConfig = Object.assign({}, getBaseRequestConfig(), {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      plainPassword: {
        first: password,
        second: passwordRepeated
      }
    })
  });

  const response = await asyncFetch(url, requestConfig);

  return await response.json();
}
