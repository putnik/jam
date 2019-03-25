<template>
  <div id="input-form">
    <el-form>
      <el-input placeholder="Please enter your message" class="input-with-select">
        <el-select slot="prepend" placeholder="Attach" value="">
          <el-option label="Image" value="image" :disabled="true">
            <i class="el-icon-picture" style="margin-right:6px"></i> Image
          </el-option>
          <el-option label="File" value="file" :disabled="true">
            <i class="el-icon-document" style="margin-right:6px"></i> File
          </el-option>
          <el-option label="Contact" value="contact" :disabled="true">
            <i class="el-icon-phone" style="margin-right:6px"></i> Contact
          </el-option>
        </el-select>
        <el-button slot="append" class="primary" @click="onSend">Send</el-button>
      </el-input>
    </el-form>
  </div>
</template>

<script>
export default {
  form: {
    message: '',
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    data() {
      return {
      };
    },
    onSend() {
      // TODO: send message
    },
    select() {
      // TODO
    },
  },
};
</script>

<style>
</style>
