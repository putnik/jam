<template>
  <form class="ui form inputfield-wrapper" @submit="handleSubmit">
    <div class="ui fluid action input">
      <input type="text" v-model="message" @keyup.13.native="handleSubmit"
             placeholder="Please enter your message" :disabled="isDisabled">
      <button class="ui button primary" :disabled="isDisabled">Send</button>
    </div>
  </form>
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
      return this.contactJid === null;
    },
  },
  methods: {
    handleSubmit() {
      this.$xmpp.send(this.contactJid, this.message);
      this.message = '';
    },
  },
};
</script>

<style>
.inputfield-wrapper {
  width: 100% !important;
}
</style>
