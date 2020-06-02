<template>
  <div class="screenshot-bar">
    <button class="sbar-button" @click="editImage">
      <CropIcon/> Edit
    </button>
    <button class="sbar-button" @click="copyToClipboard" v-tooltip="'copied to clipboard'" v-tooltip-on="copiedToClipboard">
      <ClipboardIcon/> Copy to Clipboard
    </button>
    <button class="sbar-button" @click="saveAs">
      <SaveIcon/> Save
    </button>
  </div>
</template>

<script>
  import fs from 'fs'
  import * as imageConversion from 'image-conversion'
  // import Vue from 'vue';
  // import VueToast from 'vue-toast-notification';
  // import 'vue-toast-notification/dist/theme-default.css';
  import { mapState } from 'vuex'
  
  import Vue from 'vue';

  export default {
    name: 'ScreenshotBar',
    components: {

    },
    data: function() {
      return {
        copiedToClipboard: false,
        copiedToClipboardTimerId: null
      }
    },
    props: {
      screenshotId: Number,
    },
    computed: {
      // image() {
      //   return new Image(this.imagePointer);
      // },
      // imagePointer() {
      //   return this.screenshot[this.screenshotId]
      // },
      ...mapState(['screenshot'])
    },
    mounted() {
    },
    watch: {
      copiedToClipboard () {
        if (this.copiedToClipboard === true) {
          if (this.copiedToClipboardTimerId !== null) {
            clearTimeout(this.copiedToClipboardTimerId);
            this.copiedToClipboardTimerId = null;
          }
          this.copiedToClipboardTimerId = setTimeout(() => { this.copiedToClipboard = false}, 500)
        }
      }
    },
    methods: {
      async convertBase64ToBlob() {
        let blob = await imageConversion.dataURLtoFile(this.screenshot[this.screenshotId], "image/png")
        return blob
      },
      resetApp() {
        this.$store.dispatch('resetScreenshots', null);
      },
      editImage() {

        // console.log(process.env.windir = 'C:\\Windows')

        // let Registry = require('winreg');
        // let regKey = new Registry({                                       // new operator is optional
        //   hive: Registry.HKCU,                                        // open registry hive HKEY_CURRENT_USER
        //   key:  '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run' // key containing autostart programs
        // });

        // regKey.values((err, items) => {
        //   console.log(err);
        //   console.log(items);
        // });

        // // list autostart programs
        // regKey.values(function (err, items /* array of RegistryItem */) {
        //   if (err)
        //     console.log('ERROR: '+err);
        //   else
        //     for (var i=0; i<items.length; i++)
        //       console.log('ITEM: '+items[i].name+'\t'+items[i].type+'\t'+items[i].value);
        //     }
        // );

        let app = this.$remote.app
        var basepath = app.getAppPath();

        let child = require('child_process').execFile;
        let path = require('path')

        console.log(basepath)
        console.log(basepath)
        console.log(basepath)
        let executablePath = path.join(basepath, 'bundled/openPhoto.cmd');
        let parameters = [""];

        child(executablePath, parameters, function(err, data) {
             console.log(err)
             console.log(data.toString());
        });
      },
      async copyToClipboard() {
        // navigator.clipboard.writeText(blob)
        try {
          let blob = await this.convertBase64ToBlob();
          // navigator.clipboard.write(new ClipboardItem({[blob.type]: blob}))
          // let data = await fetch(myFile);
          // let blob = await data.blob();
          await navigator.clipboard.write([
            new ClipboardItem({[blob.type]: blob})
          ]);
          this.copiedToClipboard = true;

          // console.log('Image copiedToClipboard.');
        } catch(err) { console.error(err.name, err.message); }

      },
      async saveAs() {
        try {
          // let blob = await this.convertBase64ToBlob();

          let res = await this.$remote.dialog.showSaveDialog()

          if (res.canceled === true) {
            return 0
          } else {

            // fs.appendFileSync(res.filePath, this.screenshot[this.screenshotId].split(';base64,').pop(), {encoding: 'base64'})
            fs.appendFileSync(res.filePath, this.screenshot[this.screenshotId].slice(23), {encoding: 'base64'})
            // let buffer = await blob.arrayBuffer();
            // fs.appendFileSync(res.filePath, Buffer.from(buffer));
            // buffer = null;
            // blob = null;
            // res = null;
          }
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