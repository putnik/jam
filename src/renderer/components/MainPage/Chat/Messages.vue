<template>
  <el-main>
    <div v-for="(message, messageIndex) in messages"
         :class="`message-${message.type}`"
         :item="message"
         :index="messageIndex">
      <el-row v-if="message.newDate" type="flex" justify="center">
        <el-col :xs="{span: 12}" :sm="{span: 6}">
          <el-alert type="info" center :closable="false" :title="message.newDate"/>
        </el-col>
      </el-row>
      <el-row type="flex" :justify="(message.type === 'in' ? 'start' : 'end')">
        <el-col :xs="{span: 24}" :sm="{span: 18}" class="message-col">
          <div class="message-block">
            <div class="message-info">
              <div class="message-author">{{ message.from.local }}</div>
              <div class="message-time">{{ message.time.toLocaleTimeString() }}</div>
            </div>
            <el-card shadow="never" class="message-card" :body-style="{ padding: '12px 16px' }">
              <div class="message-text" v-html="message.text" v-linkified></div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-main>
</template>

<script>
export default {
  computed: {
    contactJid() {
      return this.$store.state.xmpp.contactJid || '';
    },
    messages() {
      const { contactJid } = this.$store.state.xmpp;
      if (contactJid === null || undefined === this.$store.state.xmpp.activeMessages) {
        return {};
      }
      let messages = this.$store.state.xmpp.activeMessages;
      let lastDate = null;
      for (let messageIndex in messages) {
        if (messages.hasOwnProperty(messageIndex) === false) {
          continue;
        }
        const date = messages[messageIndex].time.toLocaleDateString();
        if (date !== lastDate) {
          lastDate = date;
          messages[messageIndex].newDate = date;
        }
      }

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
  .message-block {
    display: inline-block;
  }

  .message-card {
    text-align: left;
  }

  .message-info {
    text-align: left;
    margin-top: .5em;
    margin-bottom: .1em;
    color: #909090;
  }

  .message-author,
  .message-time {
    display: inline-block;
  }

  .message-author {
    font-weight: bold;
    margin-right: .5em;
  }

  .message-time {
    float: right;
    font-size: .75em;
    padding-top: 3px;
  }

  .message-out .message-col {
    text-align: right;
  }

  .message-in .message-card {
    background: #f0f9eb;
  }

  .message-out .message-card {
    background: #ecf5ff;
  }

  .message-text a {
    color: #399bff;
  }
</style>
