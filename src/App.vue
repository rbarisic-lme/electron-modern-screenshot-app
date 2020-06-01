<template>
  <div id="app">
    <!-- <FlashScreen v-if="screenshot !== null"/> -->
    <MainComponent v-if="screenshotCount > 0"/>
    <button class="sbar-button" @click="$store.dispatch('makeScreenshot');">Make Screenshot</button>
  </div>
</template>

<script>
// import FlashScreen from './components/FlashScreen.vue'
import MainComponent from './components/MainComponent.vue'

export default {
  name: 'App',
  components: {
    // FlashScreen,
    MainComponent
  },
  data: function() {
    return {
    }
  },
  computed: {
    screenshotCount() {
      return this.$store.getters['getScreenshotCount']
    },
  },
  mounted() {
    this.$remote.globalShortcut.unregisterAll();
    this.$remote.globalShortcut.register('CommandOrControl+Shift+Printscreen', () => {
        this.makeScreenshot();
    })
  },
  watch: {

  },
  destroyed() {
    // this.$remote.globalShortcut.unregisterAll()
  },
  methods: {
    //win.focus() on capture
    makeScreenshot() {
      this.$store.dispatch('makeScreenshot')
    }
  },
}
</script>

<style>
#app {
  position: absolute;
  bottom:  0;
  left:  0;
  width:  100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
