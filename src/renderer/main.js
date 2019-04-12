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
      status: 'disconnected',
      roster: [],
      contactJid: null,
      messages: {},
      activeMessages: {},
      software: {
        name: process.env.npm_package_name,
        version: process.env.npm_package_version,
        os: require('os').release(),
      },
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
}).$mount('#app');

if (v.$db.getConfig('jid')
  && v.$db.getConfig('password')
  && v.$db.getConfig('transport')
  && v.$db.getConfig('url')
) {
  v.$xmpp.connect(
    v.$db.getConfig('jid'),
    v.$db.getConfig('password'),
    v.$db.getConfig('transport'),
    v.$db.getConfig('url'),
  );
} else {
  v.$router.push({
    name: 'settings',
    params: {},
  });
}
