import asyncFetch from './async-fetch';
import {getBaseRequestConfig} from './baseRequestConfig';

export async function fetchProfile(userId) {

  /* global API_BASE_URL */
  const url = API_BASE_URL + '/profile/' + userId;

  const response = await asyncFetch(url, getBaseRequestConfig());

  return await response.json();
}


export async function changePassword(userId, currentPassword, newPassword, newPasswordRepeated) {

  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    body: JSON.stringify({
      "current_password": currentPassword,
      "plainPassword": {
        "first": newPassword,
        "second": newPasswordRepeated
      }
    })
  });

  /* global API_BASE_URL */
  const url = API_BASE_URL + '/password/' + userId + '/change';

  const response = await asyncFetch(url, requestConfig);

  return await response.json();
}
