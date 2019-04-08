<template>
  <el-container>
    <el-header>
      <Info :jid="jid"/>
    </el-header>
    <Messages :jid="jid" class="chat-main" />
    <el-footer class="chat-footer">
      <Input :jid="jid"/>
    </el-footer>
  </el-container>
</template>

<script>
import Info from './Chat/Info';
import Input from './Chat/Input';
import Messages from './Chat/Messages';

export default {
  name: 'chat',
  components: { Info, Input, Messages },
  data() {
    return {
      jid: 'work@xmpp.putnik.tech',
    };
  },
};
</script>

<style>
  .chat-main {
    border-top: 1px solid #e6e6e6;
  }

  .chat-footer {
    height: 56px;
    padding-top:8px;
  }
</style>
