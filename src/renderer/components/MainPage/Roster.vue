<template>
  <main>
    <el-menu>
      <el-menu-item v-for="(contact, contactIndex) in contacts"
                    :item="contact"
                    :index="contactIndex"
                    :key="contact.jid"
                    @click="handleClick">
        <i v-if="'online' === contact.status" class="el-icon-circle-check"></i>
        <i v-else class="el-icon-circle-close-outline"></i>
        {{ contact.name }}
        <el-tag
            v-for="group in contact.groups"
            :key="group"
            size="mini">
          {{group}}
        </el-tag>
        <el-badge v-if="contact.unreadCount" class="mark" type="primary"
                  :value="contact.unreadCount" :max="99"/>
      </el-menu-item>
    </el-menu>
  </main>
</template>

<script>
export default {
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    handleClick(event) {
      this.$xmpp.openContact(event.$options.propsData.index);
    },
  },
  computed: {
    contacts() {
      const contacts = {};

      if (undefined !== this.$store.state.xmpp.roster) {
        this.$store.state.xmpp.roster.forEach((item) => {
          const contact = {
            jid: item.jid.toString(),
            name: item.name,
            status: 'offline',
            unreadCount: 0,
            groups: item.groups,
          };
          contacts[contact.jid] = contact;
        });
      }

      return contacts;
    },
  },
};
</script>

<style>
</style>
