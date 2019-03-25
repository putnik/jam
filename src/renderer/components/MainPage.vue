<template>
  <el-container id="wrapper">
    <el-aside width="250px">
      <ContactList/>
    </el-aside>
    <el-container>
      <el-main>
        <MessageHistory/>
      </el-main>
      <el-footer height="56px">
        <InputForm/>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import ContactList from './MainPage/ContactList';
import InputForm from './MainPage/InputForm';
import MessageHistory from './MainPage/MessageHistory';

export default {
  name: 'main-page',
  components: { ContactList, InputForm, MessageHistory },
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
