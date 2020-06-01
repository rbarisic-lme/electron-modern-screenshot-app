<template>
  <div class="timer-progressbar" v-bind:style="progressStyle">
  </div>
</template>

<script>
  // import Vue from 'vue';
  // import VueToast from 'vue-toast-notification';
  // import 'vue-toast-notification/dist/theme-default.css';

  import { mapState } from 'vuex'

  export default {
    name: 'TimeUntilDestroy',
    components: {

    },
    data: function() {
      return {
        intervalProgress: 0,
        intervalIncrement: 50,
      }
    },
    props: {
      timer: Number,
      parenRef: Object,
    },
    computed: {
      // show ratio of time depleted, adjusted for async setInterval. Represents time left to act.
      amountRatio() {
        return (this.intervalProgress + this.intervalIncrement) / this.timer
      },
      amountPercent() {
        return Math.floor(this.amountRatio * 100)
      },
      fullMinusAmountPercent() {
        return 100 - this.amountPercent;
      },
      progressStyle() {
        // console.log(this.fullMinusAmountPercent);
        return {
          width: this.fullMinusAmountPercent + '%',
          opacity: this.mouseActive ? '0' : '1'
        }
      },
      intervalId: {
        get() {
          return this.$store.getters['destroyIntervalId']
        },
        set(id) {
          console.log('im setting it)')
          this.$store.commit('setDestroyIntervalId', id)
          console.log('interval id:', this.$store.getters['destroyIntervalId'])
          console.log(this.$store.getters['destroyIntervalId'])

        }
      },
      ...mapState(['mouseActive'])
    },
    mounted() {
      this.startInterval();
    },
    watch: {
      intervalProgress() {
        console.log(this.intervalProgress)
        if (this.intervalProgress >= this.timer) {
          this.handleInterval('clear', null);
        }
      }
    },
    methods: {
      handleInterval(fn, duration) {
        if (fn !== 'clear') {
          clearInterval(this.intervalId);
          this.intervalProgress = 0;
          this.intervalId = setInterval(fn, duration);
          console.log(this.intervalId)
        } else {
          clearInterval(this.intervalId);
          this.intervalProgress = 0;
        }
      },
      startInterval() {
        this.handleInterval(() => {
          if (!this.mouseActive) {
            this.intervalProgress += this.intervalIncrement
          }

          if (this.intervalProgress >= this.timer) {
            this.$store.dispatch('resetScreenshots');
            this.handleInterval('clear');
          }
          // console.log(this.amountPercent);
        }, this.intervalIncrement)
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
  .timer-progressbar {
    /* animation-name: progress; */
    /* animation-duration: 8s; */
    /* animation-timing-function: linear; */
    transition:  width .1s linear;
    width: 100%;
    height: 4px;
    background-color: #fff;
  }

  @keyframes progress {
    0% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }
</style>