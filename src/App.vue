<template>
  <div id="app">
    <MainComponent v-if="screenshot !== null" :screenshot="screenshot"/>
  </div>
</template>

<script>
import MainComponent from './components/MainComponent.vue'
import captureScreen from '@/services/captureScreen.js'

export default {
  name: 'App',
  components: {
    MainComponent
  },
  data: function() {
    return {
      screenshot: null,
    }
  },
  computed: {

  },
  mounted() {
    window.addEventListener('keypress', e => {
      if (e.code == 'KeyP' && e.ctrlKey == true && e.shiftKey == true) {
        console.log(e)
        this.makeScreenshot();
      }
    })
  },
  watch: {

  },
  methods: {
    //win.focus() on capture
    makeScreenshot() {
      // console.log(captureScreen)

      captureScreen(img => {
        this.screenshot = img
      });
    }
  },
}
</script>

<style>
#app {
  position: absolute;
  bottom:  0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
