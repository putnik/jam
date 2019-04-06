<template>
  <main>
    <el-row v-for="(message, messageIndex) in messages"
            :class="`message-${message.type}`"
            :item="message"
            :index="messageIndex"
            type="flex"
            :justify="(message.type === 'in' ? 'start' : 'end')">
      <el-col :xs="{span: 24}" :sm="{span: 18}" class="message-col">
        <el-card shadow="never" class="message-card">
          <div class="message-author">{{ message.from.local }}</div>
          <div class="message-time">{{ message.time.toLocaleString() }}</div>
          <div class="message-text" v-html="message.text" v-linkified></div>
        </el-card>
      </el-col>
    </el-row>
    <div >
    </div>
  </main>
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
  .message-card {
    display: inline-block;
    text-align: left;
  }

  .message-author,
  .message-time {
    display: inline-block;
    font-size: smaller;
    color: #909090;
  }

  .message-author {
    font-weight: bold;
  }

  .message-time:before {
    content: '(';
  }

  .message-time:after {
    content: ')';
  }

  .message-text {
    margin-top: 8px;
  }

  .message-out .message-col {
    text-align: right;
  }

  .message-in .message-card {
    background: #f0f9eb;
    border-color: #ddead6;
  }

  .message-out .message-card {
    background: #f4f4f5;
  }

  .message-text a {
    color: #399bff;
  }
</style>
