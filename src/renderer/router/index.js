import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/Settings').default,
    },
    {
      path: '/main',
      name: 'main',
      component: require('@/components/MainPage').default,
    },
    {
      path: '/',
      redirect: '/setting',
    },
    {
      path: '*',
      redirect: '/main',
    },
  ],
});
