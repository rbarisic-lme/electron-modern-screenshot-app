<template>
  <div class="screenshot-bar">
    <button class="sbar-button" @click="copyToClipboard">
      <ClipboardIcon/> Copy to Clipboard
    </button>
    <button class="sbar-button" @click="saveAs">
      <SaveIcon/> Save
    </button>

    <button class="sbar-button" @click="$store.dispatch('makeScreenshot'); $store.dispatch('resetScreenshot')">Make Screenshot</button>
  </div>
</template>

<script>
  import fs from 'fs'
  import { remote } from 'electron'
  console.log(fs)
  // import Vue from 'vue';
  // import VueToast from 'vue-toast-notification';
  // import 'vue-toast-notification/dist/theme-default.css';

  export default {
    name: 'ScreenshotBar',
    components: {

    },
    data: function() {
      return {

      }
    },
    props: {
      clickFn: Function
    },
    computed: {

    },
    mounted() {
    },
    watch: {

    },
    methods: {
      resetApp() {
        this.$store.dispatch('resetScreenshot', null);
      },
      copyToClipboard() {
        console.log('copy to clipboard')
      },
      saveAs() {
        console.log('save as')
        remote.dialog.showSaveDialog().then(res => {
          console.log(res)
          if (res.canceled === true) {
            return 0
            // throw new Error('Dialog cancelled')
          }
          fs.writeFileSync(res.filePath, this.screenshot);

          this.resetApp()
        });
        // }).catch(err => {
        //   console.log(err)
        // })
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
  .screenshot-bar {
    margin-top: 12px;
  }

  .sbar-button {
    display: inline-block;
    border: 1px solid #666;
    padding:  12px;
    background:  none;
    margin-right:  12px;
    color:  #ccc;
  }
  .sbar-button:last-child {
    margin-right: 0;
  }
  .sbar-button:hover {
    border: 1px solid orange;
  }
</style>