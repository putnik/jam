<template>
  <el-menu class="el-menu-demo" mode="horizontal">
    <el-menu-item>{{ contactJid }}</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'sidebar',
  computed: {
    contactJid() {
      return this.$store.state.xmpp.contactJid;
    },
  },
};
</script>

<style>

</style>
