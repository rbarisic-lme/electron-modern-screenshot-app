import Vue from 'vue'
import Vuex from 'vuex'
import captureScreen from '@/services/captureScreen.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screenshot: new Set()
  },
  mutations: {
    setScreenshot(state, val) {
      let copy = new Set(state.screenshot);
      val;
      copy.add(val);
      state.screenshot = copy;
      copy = null;
      // console.log(state.screenshot.size)
    },
    resetScreenshot(state) {
      state.screenshot = new Set();
    }
  },
  actions: {
    setScreenshot(store, val) {
      store.commit('setScreenshot', val)
    },
    resetScreenshot(store) {
      store.commit('resetScreenshot')
    },
    makeScreenshot(store) {
      store.dispatch('resetScreenshot');
      var audio = new Audio(require('@/assets/shutter_sound1.flac'))
      audio.play();

      captureScreen(img => {
        store.dispatch('setScreenshot', img)
      });
    }
  },
  getters: {
    getScreenshot(state) {
      return state.screenshot
    }
  },
  modules: {
  }
})
