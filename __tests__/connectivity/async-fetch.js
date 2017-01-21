
const fetchMock = require('fetch-mock');

import asyncFetch from '../../src/connectivity/async-fetch';

describe('asyncFetch', () => {

  it('can fetch', async () => {

    fetchMock.get('http://fake.com', {hello: "world"});

    const response = await asyncFetch('http://fake.com');
    const result = await response.json();

    expect(result.hello).toEqual("world");

  });

});
