<template>
  <div class="screenshot-bar">
    <button class="sbar-button" @click="copyToClipboard" v-tooltip="'Edited'" v-tooltip-on="true">
      <CropIcon/> Edit
    </button>
    <button class="sbar-button" @click="copyToClipboard" v-tooltip="'successfully saved!'" v-tooltip-on="2">
      <ClipboardIcon/> Copy to Clipboard
    </button>
    <button class="sbar-button" @click="saveAs">
      <SaveIcon/> Save
    </button>
  </div>
</template>

<script>
  import fs from 'fs'
  import { remote } from 'electron'
  import * as imageConversion from 'image-conversion'
  // import Vue from 'vue';
  // import VueToast from 'vue-toast-notification';
  // import 'vue-toast-notification/dist/theme-default.css';
  import { mapState } from 'vuex'

  export default {
    name: 'ScreenshotBar',
    components: {

    },
    data: function() {
      return {
      }
    },
    props: {
      screenshotId: Number,
    },
    computed: {
      imageAsFile() {
        return 2
      },
      image() {
        let tempImg = new Image();
        tempImg.src = this.imagePointer;
        return new Image(this.imagePointer);
      },
      imagePointer() {
        return this.screenshot[this.screenshotId]
      },
      ...mapState(['screenshot'])
    },
    mounted() {
      // console.log(this.screenshot)
      // console.log(this.imagePointer)
    },
    watch: {

    },
    methods: {
      async convertToFile() {
        const blob = await imageConversion.dataURLtoFile(this.imagePointer, "image/png")

        return blob
      },
      resetApp() {
        this.$store.dispatch('resetScreenshots', null);
      },
      async copyToClipboard() {
        // navigator.clipboard.writeText(blob)
        try {
          const blob = await this.convertToFile();
          // navigator.clipboard.write(new ClipboardItem({[blob.type]: blob}))
          // const data = await fetch(myFile);
          // const blob = await data.blob();
          await navigator.clipboard.write([
            new ClipboardItem({[blob.type]: blob})
          ]);
          console.log('Image copied.');
        } catch(err) { console.error(err.name, err.message); }

      },
      async saveAs() {
        try {
          const blob = await this.convertToFile();

          remote.dialog.showSaveDialog().then(res => {
            console.log(res)
            if (res.canceled === true) {
              return 0
            } else {
              fs.writeFileSync(res.filePath, blob);
            }
          });

        } catch(err) { console.error(err.name, err.message); }
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
  .screenshot-bar {
    position: absolute;
    background: rgba(0,0,0,0.7);
    display:  flex;
    bottom: 0;
    left: 2px;
    width: calc(100% - 4px - 8px);
    padding:  4px;
    /* opacity: 0; */
  }
  .screenshot-bar:hover {
    /* opacity: 1; */
  }
</style>