const os = require('os');
const stanza = require('stanza');

function Xmpp(Vue, store) {
  const xmpp = this;
  let client;

  const log = (name, data) => {
    if (name.search('raw:') === 0) {
      return;
    }

    let message;
    if (typeof data === 'string') {
      message = data;
    } else {
      try {
        message = JSON.stringify(data, null, '  ');
      } catch {
        message = data;
      }
    }

    if (undefined !== console) {
      console.log(name, message);
    }
  };

  this.addMessage = (contactJid, message, timestamp, skipActive) => {
    contactJid = contactJid.toString();
    contactJid = contactJid.replace(/\/.+$/, '');
    message = {
      id: message.id,
      type: message.from.bare === store.state.xmpp.jid ? 'out' : 'in',
      from: {
        bare: message.from.bare,
        domain: message.from.domain,
        local: message.from.local,
      },
      text: message.body,
      time: timestamp,
    };

    if (undefined === store.state.xmpp.messages[contactJid]) {
      store.state.xmpp.messages[contactJid] = {};
    }
    Vue.set(store.state.xmpp.messages[contactJid], message.id, message);

    if (skipActive !== true && contactJid === store.state.xmpp.contactJid) {
      Vue.set(store.state.xmpp.activeMessages, message.id, message);
    }
  };

  this.connect = (options) => {
    if (undefined !== client) {
      client.disconnect();
    }

    client = stanza.createClient({
      capsNode: 'http://jam.putnik.tech/caps',
      lang: store.state.xmpp.locale,
      softwareVersion: {
        name: process.env.npm_package_name,
        version: process.env.npm_package_version,

        // TODO: MUST provide a way to disable sharing of information about the OS:
        //       https://xmpp.org/extensions/xep-0092.html#security
        os: os.platform() + ' ' + os.release(),
      },
      timeout: 60,
      useStreamManagement: true,


      jid: options.jid,
      password: options.password,

      resource: options.resource,
      transport: options.transport,
      boshURL: options.url,
      wsURL: options.url,
    });

    if (undefined !== console) {
      client.on('*', log);
    }

    client.on('session:started', () => {
      store.state.xmpp.status = 'connected';
      store.state.xmpp.jid = options.jid;
      store.state.xmpp.password = options.password;
      store.state.xmpp.transport = options.transport;
      store.state.xmpp.url = options.url;

      client.enableKeepAlive({
        interval: 25,
        timeout: 15,
      });
      client.getRoster(() => {
        client.updateCaps();
        client.sendPresence({
          caps: client.disco.caps,
        });
        client.enableCarbons();
      });
    });

    client.on('session:end', () => {
      store.state.xmpp.status = 'disconnected';
    });

    client.on('iq', (data) => {
      if (data.type === 'result' && undefined !== data.roster && undefined !== data.roster.items && data.to !== '') {
        store.state.xmpp.roster = data.roster.items;
      }
    });

    client.on('message', (data) => {
      if (data.body !== undefined) {
        xmpp.addMessage(data.from, data, new Date());
        store.state.xmpp.lastMessage = data;
      }
    });

    client.on('message:sent', (data) => {
      if (data.body !== undefined) {
        xmpp.addMessage(data.to, data, new Date());
      }
    });

    client.connect();
  };

  this.send = (to, message) => {
    client.sendMessage({
      from: store.state.xmpp.jid,
      to,
      body: message,
    });
  };

  this.openContact = (contactJid) => {
    store.state.xmpp.contactJid = contactJid;
    if (undefined !== store.state.xmpp.messages[contactJid]) {
      store.state.xmpp.activeMessages = store.state.xmpp.messages[contactJid];
      return;
    }

    client.searchHistory({
      with: contactJid,
      rsm: {
        max: 50,
        before: true,
      },
    }, (err, res) => {
      store.state.xmpp.activeMessages = {};
      if (undefined !== res && res.type === 'result' && undefined !== res.mamResult && undefined !== res.mamResult.items) {
        res.mamResult.items.forEach((item) => {
          xmpp.addMessage(contactJid, item.forwarded.message, item.forwarded.delay.stamp, true);
        });
        store.state.xmpp.activeMessages = store.state.xmpp.messages[contactJid];
      }
    });
  };
}

export default {
  install(Vue, options) {
    Vue.prototype.$xmpp = new Xmpp(Vue, options.store);
  },
};
