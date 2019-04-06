<template>
  <main>
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">
          <i :class="iconClass"></i>
          {{ username }}
        </template>
        <el-menu-item index="1-1" @click="handleProfileClick">Profile</el-menu-item>
        <el-menu-item index="1-2" @click="handleSettingsClick">Settings</el-menu-item>
        <el-menu-item index="1-3" @click="handleLogoutClick">Logout</el-menu-item>
      </el-submenu>
    </el-menu>
  </main>
</template>

<script>
export default {
  methods: {
    handleSelect() {
    },
    handleProfileClick() {
      this.$router.push({
        name: 'settings',
        params: {},
      });
    },
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
  data() {
    return {
      // profile: this.state.profile,
    };
  },
  computed: {
    iconClass() {
      if (this.$store.state.xmpp.status === 'connected') {
        return 'el-icon-success';
      }
      return 'el-icon-close-outline';
    },
    username() {
      return this.$store.state.xmpp.jid || 'Not configured';
    },
  },
};
</script>

<style>
</style>
