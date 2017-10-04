const debug = require('debug')('api-lib:services:post');
const fetch = require('isomorphic-fetch');

module.exports = (verb) => {
  function handleResponse(url, fulfill, reject) {
    return (res) => {
      debug('post response', url, res.status);

      if (res.status === 500) {
        debug(`error when calling ${url}. error was: ${res.statusText}`);

        if (reject) {
          reject(res);
        }
      } else if (res.status === 400) {
        debug(`${url} returned 400. message: ${res.statusText}`);
        res.json().then(json => reject(json)).catch(() => reject());
      } else {
        fulfill(res);
      }
    };
  }

  return (url, data) => {
    debug('post. data', data);

    const func = (fulfill, reject) => {
      fetch(url,
        { method: verb,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(handleResponse(url, fulfill, reject))
        .catch(reject);
    };

    return new Promise(func);
  };
};
