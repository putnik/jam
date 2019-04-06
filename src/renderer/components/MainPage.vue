<template>
  <main @mousemove="handleMouseMove" @mouseup="handleMouseUp">
    <el-container class="mainpage-wrapper">
      <el-aside :width="asideWidth" class="mainpage-aside">
        <Profile/>
        <Roster/>
        <div class="mainpage-aside-drag" @mousedown="handleMouseDown"></div>
      </el-aside>
      <el-container>
        <Chat/>
      </el-container>
    </el-container>
  </main>
</template>

<script>
import Roster from './MainPage/Roster';
import Chat from './MainPage/Chat';
import Profile from './MainPage/Profile';

export default {
  name: 'main-page',
  components: { Profile, Roster, Chat },
  data() {
    return {
      isResizing: false,
      asideWidth: '350px',
    };
  },
  created() {
    this.asideWidth = this.$db.getConfig('asideWidth');
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    handleMouseDown() {
      this.isResizing = true;
    },
    handleMouseMove(event) {
      if (!this.isResizing) {
        return;
      }
      let width = event.clientX + 1;
      width = Math.max(width, 200);
      width = Math.min(width, 400);
      this.asideWidth = `${width}px`;
    },
    handleMouseUp() {
      this.isResizing = false;
      this.$db.setConfig('asideWidth', this.asideWidth);
    },
  },
};
</script>

<style>
  .mainpage-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .mainpage-aside {
    position: relative;
    overflow-x: hidden;
  }

  .mainpage-aside-drag {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 2px;
    background: #e6e6e6;
    cursor: ew-resize
  }
</style>
