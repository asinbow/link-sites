import store from './store';
import './utils/intialize';
import { MESSAGE_HTTP, PORT_CONNECTION } from './utils/constants';

browser.runtime.onMessage.addListener(async (request, sender) => {
  const { type } = request;
  switch (type) {
    case MESSAGE_HTTP: {
      const { options } = request;
      return axios(options).then(response => {
        const { status, statusText, data, headers } = response;
        return { status, statusText, data, headers };
      }).catch(err => {
        return { error: err };
      });
      break;
    }
    default: {
      console.warn("Unknown message type", type);
      break;
    }
  }
});

// Long-lived connections
const connections = new Set();

browser.runtime.onConnect.addListener(port => {
  console.assert(port.name == PORT_CONNECTION);
  connections.add(port);
  console.debug("port connected", port);

  port.onMessage.addListener(message => {
  });

  port.onDisconnect.addListener(() => {
    connections.delete(port);
    if (browser.runtime.lastError) {
      console.warn("disconnected with error", browser.runtime.lastError)
    }
  })
});
