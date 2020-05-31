<template>
  <div class="main-component" v-if="screenshot !== null">

    <div class="visible-group">
      <div class="screenshots">
        <div class="image" v-for="(key, val) of screenshot" :key="val">
          <img alt="" :src="key">
        </div>
      </div>
      {{screenshot[0]}}
      <ScreenshotBar/>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import ScreenshotBar from '@/components/ScreenshotBar.vue'
  import remote from 'electron'

export default {
  name: 'MainComponent',
  props: {
  },
  components: {
    ScreenshotBar,
  },
  data() {
    return {
      window: remote.webFrame,
    }
  },
  computed: {
    ...mapState(['screenshot'])
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
.main-component {
  margin:  0 auto;
  width:  auto;
  display: inline-block;
}

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

.screenshots {
  display: inline-flex;
  max-width: 100%;
  justify-content: space-between;
}

.screenshots .image {
  display: block;
  height:  200px;
}

.screenshots .image img {
  height:  calc(100% - 4px - 8px);
  padding: 2px;
  margin:  8px;
  border:  1px solid rgba(255,255,255,0.5);
}
</style>
