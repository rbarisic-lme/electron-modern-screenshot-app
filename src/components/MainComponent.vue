<template>
  <div class="main-component">

    <div class="visible-group">
      <div class="screenshots">
        <div class="image" v-for="index of screenshotCount" :key="index">
          <img alt="" :src="screenshot[index-1]">
          <ScreenshotBar :screenshotId="index-1"/>
        </div>
      </div>

      <div>
        <TimeUntilDestroy v-if="useTimer" :timer="8000" :parentRef="$el"/>
        <button v-else class="sbar-button" @click="$store.dispatch('resetScreenshots')">
          Close</button>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import TimeUntilDestroy from '@/components/TimeUntilDestroy.vue'
  import ScreenshotBar from '@/components/ScreenshotBar.vue'

export default {
  name: 'MainComponent',
  props: {
  },
  components: {
    TimeUntilDestroy,
    ScreenshotBar,
  },
  data() {
    return {
      useTimer: false,
      window: this.$remote.webFrame,
      loaded: false,
    }
  },
  computed: {
    mainRef() {
      return this.$refs['mainComponent']
    },
    screenshotCount() {
      return this.$store.getters['getScreenshotCount']
    },
    ...mapState(['screenshot']),
  },
  watch: {

  },
  methods: {
    log() {
      // console.log(window)
    },

  },
  mounted() {
    this.loaded = true

    this.$el.addEventListener('mouseenter', () => {
      this.$store.commit('setMouseActive', true)
      console.log('its entering')
    });
    this.$el.addEventListener('mouseleave', () => {
      console.log('its leaving')
      this.$store.commit('setMouseActive', false)
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main-component {
  margin:  0 auto;
  width:  auto;
  display: inline-block;
  box-shadow: 2px 2px 20px 0 rgba(0,0,0,0.5);
}

.visible-group {
  background:  rgba(0,0,0,0.5);
  padding:  12px;
}

.screenshots {
  display: inline-flex;
  max-width: 100%;
  justify-content: space-between;
  .image {
    position: relative;
    display: block;
    height:  200px;
    margin: 8px;
    &:hover {
      img {
        border:  1px solid #fff;
      }
    }
    img, {
      height:  calc(100% - 4px);
      padding: 2px;
      border:  1px solid rgba(255,255,255,0.3);
    }
  }
}

.image .screenshot-bar {
  transition: opacity .1s ease-in-out;
  opacity: 0.4;
}

.image:hover .screenshot-bar {
  opacity:  1;
}

</style>
