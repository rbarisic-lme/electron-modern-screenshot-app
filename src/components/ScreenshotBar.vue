<template>
  <div class="screenshot-bar">
    <button class="sbar-button" @click="editImage">
      <CropIcon/> Edit
    </button>
    <button class="sbar-button" @click="copyToClipboard" v-tooltip="'copied to clipboard'" v-tooltip-on="copiedToClipboard">
      <ClipboardIcon/> Copy to Clipboard
    </button>
    <button class="sbar-button" @click="saveAs" v-tooltip="'File saved'" v-tooltip-on="fileSaved">
      <SaveIcon/> Save
    </button>
  </div>
</template>

<script>
  import fs from 'fs'
  import * as imageConversion from 'image-conversion'
  import { mapState } from 'vuex'
  import Vue from 'vue';

  import path from 'path';
  import os from 'os';

  import {getRealAppPath, getRealResourcesPath} from '@/utils.js'

  export default {
    name: 'ScreenshotBar',
    components: {

    },
    data: function() {
      return {
        copiedToClipboard: false,
        copiedToClipboardTimerId: null,
        fileSaved: false,
        fileSavedTimerId: null,
      }
    },
    props: {
      screenshotId: Number,
      screenshotTimestamp: Number,
    },
    computed: {
      // image() {
      //   return new Image(this.imagePointer);
      // },
      // imagePointer() {
      //   return this.screenshots
      // },
      app() { return this.$remote.app },
      basepath() { return getRealAppPath() },
      // baseUrl() { return process.env.BASE_URL },
      tmpFilePath() { return path.join(getRealResourcesPath(), this.screenshotTimestamp+'.jpg'); },
      screenshot() {
        return this.$store.getters.getScreenshotByTimestamp(this.screenshotTimestamp)
      }
    },
    mounted() {
      console.log(getRealAppPath());
    },
    watch: {
      fileSaved () {
        if (this.fileSaved === true) {
          if (this.fileSavedTimerId !== null) {
            clearTimeout(this.fileSavedTimerId);
            this.fileSavedTimerId = null;
          }
          this.fileSavedTimerId = setTimeout(() => { this.fileSaved = false}, 500)
        }
      },
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
        let blob = await imageConversion.dataURLtoFile(this.screenshot.img, "image/png")
        return blob
      },
      resetApp() {
        this.$store.dispatch('resetScreenshots', null);
      },
      tempFileExists() {
        return fs.existsSync(this.tmpFilePath)
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
        //     for (let i=0; i<items.length; i++)
        //       console.log('ITEM: '+items[i].name+'\t'+items[i].type+'\t'+items[i].value);
        //     }
        // );

        this.saveTemp();
        let child = require('child_process').execFile;

        let executablePath = path.join(getRealResourcesPath(), 'openPhoto.cmd');
        let parameters = [this.tmpFilePath];

        child(executablePath, parameters, function(err, data) {
             console.log(err)
             console.log(data.toString());
        });

        // let child = require('child_process').execFile;
        // console.log(fs.existsSync(path.join(getRealResourcesPath(), 'openPhoto.cmd')))

        // child(path.join(getRealResourcesPath(), 'openPhoto.cmd'), [this.tmpFilePath], (err, stdout, stderr) => {
        //   console.log(err, stdout, stderr)
        // });

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
      saveTemp() {
        try {
          if (!this.tempFileExists()) {
            fs.appendFileSync(
              this.tmpFilePath,
              this.screenshot.img.slice(23),
              {encoding: 'base64'}
            );
          } else {
            console.log('file already exists')
          }
        } catch(err) {
          console.log('Temp Filewrite Error: ' + err.message);
        }
      },
      async saveAs() {
        try {
          // let blob = await this.convertBase64ToBlob();

          let savePath = path.join(os.homedir(), 'Pictures', 'Screenshot_'+this.screenshotTimestamp)

          let res = await this.$remote.dialog.showSaveDialog({
            defaultPath: savePath,
            filters: [{
              name: `Compressed JPEG Image`,
              extensions: ['jpg']
            }],
            properties: { createDirectory: true, dontAddToRecent: false}
          })

          if (res.canceled === true) {
            return 0
          } else {

            // fs.appendFileSync(res.filePath, this.screenshots.split(';base64,').pop(), {encoding: 'base64'})
            await fs.writeFileSync(res.filePath, this.screenshot.img.slice(23), {encoding: 'base64'}, (res, err) => {
              console.log(res);
              console.log(err);
            })
            this.fileSaved = true;
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