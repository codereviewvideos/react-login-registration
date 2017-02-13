import asyncFetch from './async-fetch';
import {getBaseRequestConfig} from './baseRequestConfig';

export async function fetchProfile(userId) {

  /* global API_BASE_URL */
  const url = API_BASE_URL + '/profile/' + userId;

  const response = await asyncFetch(url, getBaseRequestConfig());

  return await response.json();
}
