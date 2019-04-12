<template>
  <div class="ui fluid vertical menu roster-wrapper">
    <div class="item">
      <div class="ui icon input">
        <input type="text" placeholder="Search people...">
        <i class="search icon"></i>
      </div>
    </div>
    <a class="grey item" v-for="(contact, contactIndex) in contacts"
       :item="contact"
       :index="contactIndex"
       :key="contact.jid"
       :data-jid="contact.jid"
       @click="handleClick">
      {{ contact.name }}
      <div class="ui label" v-if="contact.unreadCount">
        {{ contact.unreadCount > 99 ? '99+' : contact.unreadCount }}
      </div>
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    handleClick(event) {
      this.$xmpp.openContact(event.target.dataset.jid);
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
  .roster-wrapper {
    height: 100%;
    border-radius: 0 !important;
    border: 0 !important;
  }
</style>
