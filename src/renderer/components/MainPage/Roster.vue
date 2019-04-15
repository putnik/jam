<template>
  <div class="ui fluid vertical menu roster-wrapper">
    <div class="item">
      <div class="ui icon input">
        <input v-model="search" type="text" placeholder="Search people...">
        <i class="search icon"></i>
      </div>
    </div>
    <div class="roster-contacts">
      <a :class="`${contact.jid === contactJid ? 'active' : ''} item roster-item`"
         v-for="(contact, contactIndex) in contacts"
         :item="contact"
         :index="contactIndex"
         :key="contact.jid"
         :data-jid="contact.jid"
         @click="handleClick">
        <Avatar class="ui avatar image roster-item-image" :username="contact.name" :size="30"/>
        <span class="roster-item-name">{{ contact.name }}</span>
        <div class="ui label" v-if="contact.unreadCount">
          {{ contact.unreadCount > 99 ? '99+' : contact.unreadCount }}
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import Avatar from 'vue-avatar';

export default {
  components: { Avatar },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    handleClick(event) {
      this.$xmpp.openContact(event.target.dataset.jid);
    },
  },
  data() {
    return {
      rosterSearch: '',
    };
  },
  computed: {
    contactJid() {
      return this.$store.state.xmpp.contactJid;
    },
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
            lastMessage: new Date(0),
          };
          const search = this.rosterSearch.toLocaleLowerCase();
          if (search === ''
            || contact.name.toLocaleLowerCase().match(search)
            || contact.jid.toLocaleLowerCase().match(search)
          ) {
            const key = `${contact.lastMessage.toLocaleDateString()}_${contact.jid}`;
            contacts[key] = contact;
          }
        });
      }

      const orderedContacts = {};
      Object.keys(contacts).sort().forEach((key) => {
        orderedContacts[contacts[key].jid] = contacts[key];
      });

      return orderedContacts;
    },
    search: {
      get() {
        return this.rosterSearch;
      },
      set(newValue) {
        this.rosterSearch = newValue;
      },
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

  .roster-contacts {
    position: absolute;
    top: 61px;
    bottom: 61px;
    width: 100%;
    overflow-y: scroll;
  }

  .roster-item {
    overflow: hidden;
  }

  .roster-item-image {
    display: inline-block !important;
    margin-top: -6px !important;
  }

  .roster-item-name {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis !important;
    max-width: 170px !important;
  }
</style>
