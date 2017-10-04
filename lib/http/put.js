const debug = require('debug')('api-lib:services:post-put');
const fetch = require('isomorphic-fetch');

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
      res.json().then(json => reject(json)).catch(err => reject(err));
    } else {
      fulfill(res);
    }
  };
}

module.exports = (url, data, headersArg) => {
  debug('post. data', data);

  const standardHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  const headers = Object.assign(standardHeaders, headersArg);

  const func = (fulfill, reject) => {
    fetch(url,
      { method: 'PUT',
        headers,
        body: JSON.stringify(data)
      })
      .then(handleResponse(url, fulfill, reject))
      .catch(reject);
  };

  return new Promise(func);
};
