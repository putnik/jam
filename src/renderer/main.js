import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import linkify from 'vue-linkify';

import 'semantic-css';
import 'semantic-js';

import App from './App';
import router from './router';
import XmppPlugin from './plugins/xmpp';
import DbPlugin from './plugins/db';

Vue.directive('linkified', linkify);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    xmpp: {
      jid: '',
      password: '',
      locale: 'en',
      status: 'disconnected',
      roster: [],
      contactJid: null,
      messages: {},
      activeMessages: {},
      lastMessage: {},
    },
  },
});

Vue.use(XmppPlugin, { store });
Vue.use(DbPlugin);

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
const v = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  data() {
    return {
      message: {},
    };
  },
  watch: {
    lastMessage(data) {
      if (undefined !== data && this.message.id !== data.id) {
        this.message = data;

        let contactJid = data.from.toString();
        contactJid = contactJid.replace(/\/.+$/, '');

        const messageNotification = new Notification(contactJid, {
          body: data.body,
        });
        messageNotification.onclick = () => {
          this.openContact(contactJid);
          messageNotification.close();
        };
        messageNotification.show();
      }
    }
  },
  computed: {
    lastMessage() {
      return this.$store.state.xmpp.lastMessage;
    }
  },
}).$mount('#app');

if (v.$db.getConfig('jid')
  && v.$db.getConfig('password')
  && v.$db.getConfig('transport')
  && v.$db.getConfig('url')
) {
  const options = {
    jid: v.$db.getConfig('jid'),
    password: v.$db.getConfig('password'),
    transport: v.$db.getConfig('transport'),
    url: v.$db.getConfig('url'),
    resource: v.$db.getConfig('resource'),
  };

  v.$xmpp.connect(options);
} else {
  v.$router.push({
    name: 'settings',
    params: {},
  });
}
