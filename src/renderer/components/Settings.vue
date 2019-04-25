<template>
  <div class="ui two column centered grid settings-wrapper">
    <div class="column">
      <div class="ui segment settings-card">
        <div class="ui middle horizontal divider header">
          <i class="plug icon"></i>
          Connection settings
        </div>
        <div class="ui form">
          <div class="field">
            <label>Username</label>
            <input v-model="jid" placeholder="username@xmpp.example.com">
          </div>
          <div class="field">
            <label>Password</label>
            <input v-model="password" type="password">
          </div>
          <div class="ui fluid accordion settings-extra">
            <div class="title active">
              <i class="dropdown icon"></i>
              Additional settings
            </div>
            <div class="content active">
              <div class="field">
                <div class="fields">
                  <div class="ten wide field">
                    <label>Transport</label>
                    <div class="ui fluid search selection dropdown">
                      <input type="hidden" v-model="transport">
                      <i class="dropdown icon"></i>
                      <div class="default text">Select transport</div>
                      <div class="menu">
                        <div class="item" data-value="websocket">BOSH</div>
                        <div class="item" data-value="bosh">WebSocket</div>
                      </div>
                    </div>
                  </div>
                  <div class="six wide field">
                    <label>Port</label>
                    <input v-model="port" type="number">
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="ui toggle checkbox">
                  <input v-model="ssl" type="checkbox">
                  <label>SSL</label>
                </div>
              </div>
            </div>
          </div>
          <div class="field">
            <label>URL</label>
            <input v-model="url" placeholder="http://xmpp.example.com/http-bind" disabled>
          </div>
          <button class="ui positive button" @click="handleConnect">Connect</button>
          <button class="ui secondary basic button" @click="handleCancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
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

      const resource = process.env.npm_package_name + '-' + Math.random().toString(36).substring(2, 8);
      this.$db.setConfig('resource', resource);

      const options = {
        jid: this.jid,
        password: this.password,
        transport: this.transport,
        url: this.url,
        resource,
      };

      this.$xmpp.connect(options);
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
    margin-top: 10% !important;
  }

  .settings-extra {
    margin-bottom: 20px;
  }

  .settings-buttons {
    margin-top: 20px;
  }
</style>
