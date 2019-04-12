<template>
  <div class="ui grid mainpage-wrapper">
    <div class="ui four wide column mainpage-aside">
      <Roster/>
      <Profile/>
    </div>
    <main class="ui twelve wide column mainpage-content">
      <header class="ui borderless top fixed menu mainpage-header">
        <Info/>
      </header>
      <Messages/>
      <footer class="ui borderless bottom fixed menu mainpage-footer">
        <div class="item mainpage-inputfield-wrapper">
          <InputField/>
        </div>
      </footer>
    </main>
  </div>
</template>

<script>
import Info from './MainPage/Info';
import InputField from './MainPage/InputField';
import Messages from './MainPage/Messages';
import Profile from './MainPage/Profile';
import Roster from './MainPage/Roster';

export default {
  name: 'main-page',
  components: {
    Info, InputField, Messages, Profile, Roster,
  },
};
</script>

<style>
.mainpage-wrapper {
  height: 100%;
  overflow: hidden;
  margin: 0 !important;
}

.mainpage-aside {
  padding: 0 !important;
  border: 0 !important;
}

.mainpage-content {
  position: relative !important;
  padding: 62px 0 62px 15px !important;
}

.mainpage-header,
.mainpage-footer {
  position: absolute !important;
  height: 62px;
  box-shadow: none !important;
  border-radius: 0 !important;
}

.mainpage-inputfield-wrapper {
  width: 100% !important;
}
</style>
