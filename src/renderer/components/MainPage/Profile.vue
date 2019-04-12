<template>
  <div class="ui bottom fixed menu profile-wrapper">
    <div class="item">
      <i :class="iconClass"></i>
    </div>
    <a class="item" @click="handleSettingsClick">
      <i class="cog icon"></i>
    </a>
    <a class="item" @click="handleLogoutClick">
      <i class="logout icon"></i>
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    handleSettingsClick() {
      this.$router.push({
        name: 'settings',
        params: {},
      });
    },
    handleLogoutClick() {
      this.$store.state.xmpp.password = null;
      this.$db.deleteConfig('password');

      this.$router.push({
        name: 'settings',
        params: {},
      });
    },
  },
  computed: {
    iconClass() {
      if (this.$store.state.xmpp.status === 'connected') {
        return 'check circle left icon';
      }
      return 'times circle outline left icon';
    },
  },
};
</script>

<style>
.profile-wrapper {
  position: absolute !important;
  height: 62px;
}
</style>
