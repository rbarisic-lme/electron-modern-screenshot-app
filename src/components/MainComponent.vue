<template>
  <div class="hello">

    <div class="visible-group">
      <img :src="screenshot" alt="" style="width: 460px">
      <ScreenshotBar/>
    </div>

  </div>
</template>

<script>
  import ScreenshotBar from '@/components/ScreenshotBar.vue'
  import remote from 'electron'

export default {
  name: 'MainComponent',
  props: {
    screenshot: String,
  },
  components: {
    ScreenshotBar,
  },
  data() {
    return {
      window: remote.webFrame,
    }
  },
  watch: {

  },
  methods: {
    log() {
      // console.log(window)
    },

  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.visible-group {
  background:  rgba(0,0,0,0.5);
  padding:  12px;
}
</style>
