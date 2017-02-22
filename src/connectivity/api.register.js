import asyncFetch from './async-fetch';
import {getBaseRequestConfig} from './baseRequestConfig';

export async function register(username, email, newPassword, newPasswordRepeated) {

  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    body: JSON.stringify({
      "username": username,
      "email": email,
      "plainPassword": {
        "first": newPassword,
        "second": newPasswordRepeated
      }
    })
  });

  /* global API_BASE_URL */
  const url = API_BASE_URL + '/register';

  const response = await asyncFetch(url, requestConfig);

  return await response.json();
}
