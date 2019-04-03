<template>
  <div id="app">
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import MainPage from './components/MainPage';
import Settings from './components/Settings';

export default {
  name: 'jam',
  components: { MainPage, Settings },
};
</script>

<style>
</style>
