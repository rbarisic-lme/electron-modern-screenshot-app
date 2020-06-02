<template>
  <div id="app">
    <!-- <FlashScreen v-if="screenshots !== null"/> -->
    <MainComponent v-if="screenshotCount > 0"/>
    <!-- <button class="sbar-button" @click="$store.dispatch('makeScreenshots');">Make Screenshots</button> -->
  </div>
</template>

<script>
// import FlashScreen from './components/FlashScreen.vue'
import MainComponent from './components/MainComponent.vue'

import { ipcRenderer } from 'electron'

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
    this.$remote.globalShortcut.unregister('CommandOrControl+Shift+Printscreen');
    this.$remote.globalShortcut.register('CommandOrControl+Shift+Printscreen', () => {
        this.makeScreenshots();
    })

    ipcRenderer.on('vuex', (event, arg) => {
      if (arg === 'makeScreenshots') {
        this.$store.dispatch('makeScreenshots');        
      }
    })
  },
  watch: {

  },
  destroyed() {
    // this.$remote.globalShortcut.unregisterAll()
  },
  methods: {
    //win.focus() on capture
    makeScreenshots() {
      this.$store.dispatch('makeScreenshots')
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
