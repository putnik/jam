<template>
  <el-timeline>
    <el-timeline-item v-for="(message, messageIndex) in messages"
                      :item="message"
                      :index="messageIndex"
                      :key="message.id"
                      :timestamp="message.from.local + ' (' + message.time.toLocaleString() + ')'"
                      :icon="('in' === message.type ? 'el-icon-arrow-down' : 'el-icon-arrow-up')"
                      :type="('in' === message.type ? 'primary' : '')"
                      placement="top">
      <p>{{ message.text }}</p>
    </el-timeline-item>
  </el-timeline>
</template>

<script>
export default {
  computed: {
    contactJid() {
      return this.$store.state.xmpp.contactJid || '';
    },
    messages() {
      const { contactJid } = this.$store.state.xmpp;
      if (contactJid === null) {
        return {};
      }
      return this.$store.state.xmpp.messages[contactJid];
    },
  },
  updated() {
    const elem = this.$el;
    elem.scrollTop = elem.clientHeight;
  },
};
</script>

<style>
  .el-timeline-item__tail {
    border-left: 0;
  }
</style>
