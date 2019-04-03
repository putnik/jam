const stanza = require('stanza');

function Xmpp (Vue, store) {
  let xmpp = this;
  let client;
  let root = new Vue();

  const log = (name, data) => {
    if (0 === name.search('raw:')) {
      return;
    }

    let message;
    if (typeof data === 'string') {
      message = data;
    } else if (name === 'connected' || name === 'disconnected') {
      message = 'Client instance: ' + JSON.stringify(data.config, null, '  ');
    } else {
      message = JSON.stringify(data, null, '  ');
    }

    console.log(name, message);

    // root.$notify.info({
    //   title: name,
    //   message: message,
    //   duration: -1,
    // });
  };

  this.addMessage = (contactJid, message, timestamp) => {
    contactJid = contactJid.toString();
    if (undefined === store.state.xmpp.messages[contactJid]) {
      store.state.xmpp.messages[contactJid] || {};
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

    console.log(store.state.xmpp.messages[contactJid]);
  };

  this.connect = (jid, password) => {
    client = stanza.createClient({
      softwareVersion: store.state.xmpp.software,
      jid: jid,
      password: password,

      // If you have a .well-known/host-meta.json file for your
      // domain, the connection transport config can be skipped.

      // transport: 'websocket',
      transport: 'bosh',
      // wsURL: 'ws://xmpp.putnik.tech:5280/xmpp-websocket',
      boshURL: 'http://xmpp.putnik.tech:5280/http-bind',
    });

    client.on('session:started', () => {
      store.state.xmpp.status = 'connected';
      client.getRoster(() => {
        client.updateCaps();
        client.sendPresence({
          caps: client.disco.caps,
        });
        client.enableCarbons();
      });
    });

    client.on('*', log);
    client.on('iq', function (data) {
      if ('result' === data.type && undefined !== data.roster && undefined !== data.roster.items && '' !== data.to) {
        store.state.xmpp.roster = data.roster.items;
      }
    });
    client.on('message:sent', function (data) {
      console.log(data.to);
      xmpp.addMessage(data.to, data, Date.now());
    });
    client.connect();
  };

  this.send = (to, message) => {
    client.sendMessage({
      from: store.state.xmpp.jid,
      to: to,
      body: message
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
        before: true
      }
    }, function(err, res) {
      store.state.xmpp.messages = {};
      if (undefined !== res && 'result' === res.type && undefined !== res.mamResult && undefined !== res.mamResult.items) {
        res.mamResult.items.forEach(function(item) {
          xmpp.addMessage(contactJid, item.forwarded.message, item.forwarded.delay.stamp);
        });
      }
    });
  };
}

export default {
  install (Vue, options) {
    Vue.prototype.$xmpp = new Xmpp(Vue, options.store);
  },
};
