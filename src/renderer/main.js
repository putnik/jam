import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import locale from 'element-ui/lib/locale/lang/en';
import App from './App';
import router from './router';
import XmppPlugin from './plugins/xmpp';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    xmpp: {
      jid: 'me@xmpp.putnik.tech',
      password: '',
      status: 'disconnected',
      roster: [],
      contactJid: null,
      messages: {},
      software: {
        name: process.env.npm_package_name,
        version: process.env.npm_package_version,
        os: require('os').release(),
      },
    },
  },
});

Vue.use(Element, { locale });
Vue.use(XmppPlugin, { store });

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
let v = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');

if (v.$store.state.xmpp.jid && v.$store.state.xmpp.password) {
  v.$xmpp.connect(v.$store.state.xmpp.jid, v.$store.state.xmpp.password)
} else {
  v.$router.push({
    name: 'settings',
    params: {},
  });
}
