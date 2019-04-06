<template>
  <el-container>
    <el-header>
      <Info :jid="jid"/>
    </el-header>
    <el-main>
      <Messages :jid="jid"/>
    </el-main>
    <el-footer height="56px">
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
  methods: {
  },
};
</script>

<style>

</style>
