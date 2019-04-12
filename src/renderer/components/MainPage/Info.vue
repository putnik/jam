<template>
  <div class="ui item">
    {{ contactJid }}
  </div>
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
