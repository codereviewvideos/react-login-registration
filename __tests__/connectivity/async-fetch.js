
const fetchMock = require('fetch-mock');

import asyncFetch from '../../src/connectivity/async-fetch';
import helpers from '../../setupJest';

describe('asyncFetch', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  xit('can fetch', async () => {

    fetchMock.get('http://fake.com', {hello: "world"});

    const response = await asyncFetch('http://fake.com');
    const result = await response.json();

    expect(result.hello).toEqual("world");

  });

  xit('handles errors', async () => {

    fetchMock.get('http://bad.url', {
      status: 400,
      body: JSON.stringify("bad data")
    });

    const outcome = await helpers.syncify(async () => {
      return await asyncFetch('http://bad.url');
    });

    expect(outcome).toThrow();

  });

  it('displays a nicer error message if one is provided', async () => {

    fetchMock.get('http://another.bad.url', {
      status: 403,
      body: JSON.stringify("go away")
    });

    const outcome = await helpers.syncify(async () => {
      return await asyncFetch('http://another.bad.url');
    });

    expect(outcome).toThrow('Forbidden');

  });

});
