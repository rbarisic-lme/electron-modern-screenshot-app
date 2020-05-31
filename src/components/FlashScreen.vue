<template>
  <div class="flashscreen">

  </div>
</template>

<script>
  // import Vue from 'vue';
  // import VueToast from 'vue-toast-notification';
  // import 'vue-toast-notification/dist/theme-default.css';

  export default {
    name: '',
    components: {

    },
    data: function() {
      return {

      }
    },
    props: {

    },
    computed: {

    },
    mounted() {
    },
    watch: {

    },
    methods: {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
  .flashscreen {
    animation-name:  flash;
    animation-duration: .3s;
    animation-iteration-count: 1;
    position: fixed;
    top:  0;
    left:  0;
    width:  100%;
    height:  100%;
  }

  @keyframes flash {
    0% {
      background:  rgba(255,255,255,1.0);
    }
    100% {
      background:  rgba(255,255,255,0.0);
    }
  }
</style>