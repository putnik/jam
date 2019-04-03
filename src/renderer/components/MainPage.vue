<template>
  <el-container id="wrapper">
    <el-aside width="250px">
      <Profile/>
      <Roster/>
    </el-aside>
    <el-container>
      <Chat/>
    </el-container>
  </el-container>
</template>

<script>
import Roster from './MainPage/Roster';
import Chat from './MainPage/Chat';
import Profile from './MainPage/Profile';

export default {
  name: 'main-page',
  components: { Profile, Roster, Chat },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
  },
};
</script>

<style>
#wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
