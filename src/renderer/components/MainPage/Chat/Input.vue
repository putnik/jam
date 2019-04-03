<template>
  <div id="input-form">
    <el-form>
      <el-input v-model="message" @keyup.13.native="handleSend" placeholder="Please enter your message" class="input-with-select">
        <el-select slot="prepend" placeholder="Attach" value="">
          <el-option label="Image" value="image" :disabled="isDisabled">
            <i class="el-icon-picture" style="margin-right:6px"></i> Image
          </el-option>
          <el-option label="File" value="file" :disabled="true">
            <i class="el-icon-document" style="margin-right:6px"></i> File
          </el-option>
          <el-option label="Contact" value="contact" :disabled="true">
            <i class="el-icon-phone" style="margin-right:6px"></i> Contact
          </el-option>
        </el-select>
        <el-button slot="append" type="primary" @click="handleSend">Send</el-button>
      </el-input>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
    };
  },
  computed: {
    contactJid() {
      return this.$store.state.xmpp.contactJid;
    },
    isDisabled() {
      return null === this.contactJid;
    }
  },
  methods: {
    handleSend() {
      this.$xmpp.send(this.contactJid, this.message);
      this.message = '';
    },
  },
};
</script>

<style>
</style>
