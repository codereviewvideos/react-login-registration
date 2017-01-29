export const getBaseRequestConfig = () => {
  return {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  };
};
