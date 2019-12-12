import { MESSAGE_HTTP, PORT_CONNECTION } from './constants';

global.browser = require('webextension-polyfill');

const IS_BACKGROUND = !!browser.runtime.getBackgroundPage;

if (IS_BACKGROUND) {
  global.axios = require('axios');
} else {
  global.axios = options => {
    return browser.runtime.sendMessage({
      type: MESSAGE_HTTP,
      options
    }).then(({ error, ...response }) => {
      if (error) {
        throw error;
      }
      return response;
    });
  };

  global.connection = browser.runtime.connect({name: PORT_CONNECTION});
}

export function request(options) {
  return axios(options).then(response => {
    const { status } = response;
    const success = status >= 200 && status < 300;
    if (!success) {
      console.error("Failed to request", options, response);
      throw new Error("Failed to request");
    }
    return response;
  });
}

global.request = request;
