

export default async function asyncFetch(url, requestConfig = {}) {

  const response = await fetch(url, requestConfig);

  return response;
}
