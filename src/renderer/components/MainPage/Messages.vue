<template>
  <main class="messages-wrapper">
    <div class="ui comments">
      <div v-for="(message, messageIndex) in messages"
           :key="messageIndex"
           :class="`message-${message.type}`"
           :item="message"
           :index="messageIndex">
        <div class="ui tiny center aligned header" v-if="message.newDate">
          {{ message.newDate }}
        </div>

        <div class="comment">
          <Avatar class="avatar" :username="message.from.local.replace(/\./g, ' ')" :size="35"/>
          <div class="content">
            <a class="author">{{ message.from.local }}</a>
            <div class="metadata">
              <span class="date">{{ message.time.toLocaleTimeString() }}</span>
            </div>
            <div class="text" v-html="message.text" v-linkified></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Avatar from 'vue-avatar';

export default {
  components: { Avatar },
  computed: {
    contactJid() {
      return this.$store.state.xmpp.contactJid || '';
    },
    messages() {
      const { contactJid } = this.$store.state.xmpp;
      if (contactJid === null || undefined === this.$store.state.xmpp.activeMessages) {
        return {};
      }
      const messages = this.$store.state.xmpp.activeMessages;
      let lastDate = null;
      Object.keys(messages).forEach((messageIndex) => {
        const date = messages[messageIndex].time.toLocaleDateString();
        if (date !== lastDate) {
          lastDate = date;
          messages[messageIndex].newDate = date;
        }
      });

      return messages;
    },
  },
  updated() {
    const elem = this.$el;
    elem.scrollTop = elem.scrollHeight;
  },
};
</script>

<style>
.messages-wrapper {
  padding-right: 15px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}

.messages-wrapper .comments {
  padding-top: 15px;
  padding-bottom: 10px;
}
</style>
