<template>
  <main>
    <el-timeline>
      <el-timeline-item v-for="(message, messageIndex) in messages"
                        v-bind:item="message"
                        v-bind:index="messageIndex"
                        v-bind:key="message.id"
                        :timestamp="message.time"
                        :icon="('in' === message.type ? 'el-icon-arrow-down' : 'el-icon-arrow-up')"
                        :type="('in' === message.type ? 'primary' : '')"
                        placement="top">
        <p>{{ message.text }}</p>
      </el-timeline-item>
    </el-timeline>
  </main>
</template>

<script>
export default {
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    onSend() {
      // TODO: send message
    },
  },
  data() {
    return {
      messages: {
        0: {
          id: 0,
          text: 'Hello!',
          type: 'in',
          time: '2018/4/12',
        },
        1: {
          id: 1,
          text: 'Hi!',
          type: 'out',
          time: '2018/4/12',
        },
        2: {
          id: 2,
          text: 'How are you?',
          type: 'in',
          time: '2018/4/12',
        },
        3: {
          id: 3,
          text: 'Fine',
          type: 'out',
          time: '2018/4/12',
        },
        4: {
          id: 4,
          text: 'Thanks!',
          type: 'out',
          time: '2018/4/12',
        },
        5: {
          id: 5,
          text: 'And you?',
          type: 'out',
          time: '2018/4/12',
        },
        6: {
          id: 6,
          text: 'I`m fine too',
          type: 'in',
          time: '2018/4/12',
        },
      },
    };
  },
};
</script>

<style>
  .el-timeline-item__tail {
    border-left: 0;
  }
</style>
