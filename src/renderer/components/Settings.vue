<template>
  <div id="setup">
    <el-row :glitter="20" justify="center" align="middle">
      <el-col :span="8" :offset="8">
        <el-card class="settings-card">
          <div slot="header" class="clearfix">
            Connection settings
          </div>
          <el-form>
            <el-form-item label="Username">
              <el-input name="jid" placeholder="name@host" :value="jid"/>
            </el-form-item>
            <el-form-item label="Password">
              <el-input name="password" type="password" :value="password"/>
            </el-form-item>
            <el-button type="primary" @click="handleConnect">Connect</el-button>
            <el-button @click="handleCancel">Cancel</el-button>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'settings',
  components: {},
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    handleConnect() {
      this.$xmpp.connect(this.$store.state.xmpp.jid, this.$store.state.xmpp.password);
      this.close();
    },
    handleCancel() {
      this.close();
    },
    close() {
      this.$router.push({
        name: 'main',
        params: {},
      });
    },
  },
  computed: {
    jid () {
      return this.$store.state.xmpp.jid || '';
    },
    password () {
      return this.$store.state.xmpp.password || '';
    },
  }
};
</script>

<style>
  .settings-card {
    margin-top: 25%;
  }
</style>
