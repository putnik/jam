<template>
  <main>
    <el-menu
        default-active="0"
        @open="handleOpen"
        @close="handleClose">
      <el-submenu v-for="(group, groupIndex) in groups"
                  v-bind:item="group"
                  v-bind:index="groupIndex"
                  v-bind:key="group.id">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>{{ group.name }}</span>
        </template>
        <el-menu-item v-for="(contact, contactIndex) in group.contacts"
                      v-bind:item="contact"
                      v-bind:index="contactIndex"
                      v-bind:key="contact.id">
          <i v-if="'online' === contact.status" class="el-icon-circle-check"></i>
          <i v-else class="el-icon-circle-close-outline"></i>
          {{ contact.name }}
          <el-badge v-if="contact.unreadCount" class="mark" type="primary"
                    :value="contact.unreadCount" :max="99"/>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </main>
</template>

<script>
export default {
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    handleOpen() {
      // todo
    },
    handleClose() {
      // todo
    },
  },
  data() {
    return {
      groups: {
        0: {
          id: 1,
          name: 'IT',
          contacts: {
            0: {
              id: 1,
              name: 'Sergey Leschina',
              status: 'offline',
              unreadCount: 3,
            },
            1: {
              id: 2,
              name: 'Ivan Ivanov',
              status: 'online',
              unreadCount: 0,
            },
          },
        },
      },
    };
  },
};
</script>

<style>
</style>
