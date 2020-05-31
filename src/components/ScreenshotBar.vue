<template>
  <div>
    <button @click="copyToClipboard">
      <ClipboardIcon/>
    </button>
    <button @click="saveAs">
      <SaveIcon/>
    </button>
  </div>
</template>

<script>
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
      copyToClipboard() {
        console.log('copy to clipboard')
      },
      saveAs() {
        console.log('save as')
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>