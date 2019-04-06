const stanza = require('stanza');

function Xmpp(Vue, store) {
  const xmpp = this;
  let client;

  this.addMessage = (contactJid, message, timestamp) => {
    contactJid = contactJid.toString();
    if (undefined === store.state.xmpp.messages[contactJid]) {
      store.state.xmpp.messages[contactJid] = {};
    }

    store.state.xmpp.messages[contactJid][message.id] = {
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
  };

  this.connect = (jid, password, transport, url) => {
    client = stanza.createClient({
      softwareVersion: store.state.xmpp.software,
      jid,
      password,

      transport,
      wsURL: url,
      boshURL: url,
    });

    client.on('session:started', () => {
      store.state.xmpp.status = 'connected';
      store.state.xmpp.jid = jid;
      store.state.xmpp.password = password;
      store.state.xmpp.transport = transport;
      store.state.xmpp.url = url;

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
    client.on('message:sent', (data) => {
      xmpp.addMessage(data.to, data, Date.now());
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
      return;
    }

    client.searchHistory({
      with: contactJid,
      rsm: {
        max: 50,
        before: true,
      },
    }, (err, res) => {
      store.state.xmpp.messages = {};
      if (undefined !== res && res.type === 'result' && undefined !== res.mamResult && undefined !== res.mamResult.items) {
        res.mamResult.items.forEach((item) => {
          xmpp.addMessage(contactJid, item.forwarded.message, item.forwarded.delay.stamp);
        });
      }
    });
  };
}

export default {
  install(Vue, options) {
    Vue.prototype.$xmpp = new Xmpp(Vue, options.store);
  },
};
