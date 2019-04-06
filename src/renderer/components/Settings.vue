<template>
  <el-row class="settings-wrapper" :glitter="20" justify="center" align="middle">
    <el-col :span="10" :offset="7">
      <el-card class="settings-card">
        <div slot="header" class="clearfix">
          Connection settings
        </div>
        <el-form label-width="80px" >
          <el-form-item label="Username">
            <el-input v-model="jid" placeholder="username@xmpp.example.com"/>
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="password" type="password"/>
          </el-form-item>
          <el-collapse>
            <el-collapse-item title="Additional settings">
              <el-form-item label="Port">
                <el-input-number v-model="port" size="small" controls-position="right"
                                 :min="1" :max="65535"/>
              </el-form-item>
              <el-form-item label="Transport">
                <el-col :span="13">
                  <el-radio-group v-model="transport" size="small">
                    <el-radio-button label="websocket" border>WebSocket</el-radio-button>
                    <el-radio-button label="bosh" border>BOSH</el-radio-button>
                  </el-radio-group>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="SSL" :span="9">
                    <el-switch v-model="ssl"/>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="URL">
                <el-input v-model="url" size="small" placeholder="http://xmpp.example.com/http-bind" disabled/>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
          <el-form-item class="settings-buttons">
            <el-button type="success" @click="handleConnect">Connect</el-button>
            <el-button @click="handleCancel">Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'settings',
  components: {},
  created() {
    this.settings = {
      jid: this.$db.getConfig('jid') || '',
      password: this.$db.getConfig('password') || '',
      transport: this.$db.getConfig('transport') || 'bosh',
      port: this.$db.getConfig('port') || 7070,
      ssl: this.$db.getConfig('ssl') || false,
      url: this.$db.getConfig('url') || '',
    };
  },
  data() {
    return {
      settings: {},
    };
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    handleConnect() {
      this.$db.setConfig('jid', this.jid);
      this.$db.setConfig('password', this.password);
      this.$db.setConfig('transport', this.transport);
      this.$db.setConfig('port', this.port);
      this.$db.setConfig('ssl', this.ssl);
      this.$db.setConfig('url', this.url);

      this.$xmpp.connect(this.jid, this.password, this.transport, this.url);
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
    jid: {
      get() {
        return this.settings.jid;
      },
      set(newValue) {
        this.settings.jid = newValue;
      },
    },
    password: {
      get() {
        return this.settings.password;
      },
      set(newValue) {
        this.settings.password = newValue;
      },
    },
    transport: {
      get() {
        return this.settings.transport;
      },
      set(newValue) {
        this.settings.transport = newValue;
      },
    },
    port: {
      get() {
        return this.settings.port;
      },
      set(newValue) {
        this.settings.port = parseInt(newValue, 10);
      },
    },
    ssl: {
      get() {
        return this.settings.ssl;
      },
      set(newValue) {
        this.settings.ssl = newValue;
      },
    },
    url: {
      get() {
        const base = `://${this.settings.jid.replace(/^.+@/, '')}:`;

        if (this.settings.transport === 'bosh') {
          return `${(this.settings.ssl ? 'https' : 'http') + base + this.settings.port}/http-bind`;
        }
        if (this.settings.transport === 'websocket') {
          return `${(this.settings.ssl ? 'wss' : 'ws') + base + this.settings.port}/ws`;
        }

        return '';
      },
      set() {
        // TODO: Add explicit URL
        // this.settings.url = newValue;
      },
    },
  },
};
</script>

<style>
  .settings-card {
    margin-top: 10%;
  }
  .settings-card .el-card__body,
  .settings-card .el-collapse-item__content {
    padding-bottom: 0;
  }

  .settings-buttons {
    margin-top: 20px;
  }
</style>
