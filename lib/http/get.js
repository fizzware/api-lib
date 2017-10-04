const debug = require('debug')('api-lib:services:get');
const fetch = require('isomorphic-fetch');

function handleResponse(url, fulfill, reject) {
  return (res) => {
    debug('get response', url, res.status);

    if (res.status === 500) {
      reject(`error when calling ${url}. error was: ${res.statusText}`);

      if (reject) {
        reject(res);
      }
    } else if (res.status === 400) {
      debug(`${url} returned 400. message: ${res.statusText}`);

      res.json().then(json => reject(json)).catch(err => reject(err));
    } else {
      fulfill(res);
    }
  };
}

module.exports = (url, data) => {
  debug('get. data', data);

  const func = (fulfill, reject) => {
    fetch(url)
      .then(handleResponse(url, fulfill, reject))
      .catch(reject);
  };

  return new Promise(func);
};
