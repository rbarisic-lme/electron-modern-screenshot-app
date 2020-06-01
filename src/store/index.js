import Vue from 'vue'
import Vuex from 'vuex'
import captureScreen from '@/services/captureScreen.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screenshot: new Array(),
    mouseActive: false,
    destroyIntervalId: null,
  },
  mutations: {
    setScreenshot(state, val) {
      let copy = state.screenshot.slice();
      val;
      copy.push(val);
      state.screenshot = copy;
      copy = null;
      // console.log(state.screenshot.size)
    },
    resetScreenshots(state) {
      state.screenshot = new Array();
    },
    setMouseActive(state, bool) {
      state.mouseActive = bool
    },
    setDestroyIntervalId(state, id) {
      state.destroyIntervalId = id
    }
  },
  actions: {
    setScreenshot(store, val) {
      store.commit('setScreenshot', val)
    },
    resetScreenshots(store) {
      store.commit('resetScreenshots')
    },
    makeScreenshot(store) {
      store.dispatch('resetScreenshots');
      var audio = new Audio(require('@/assets/shutter_sound1.flac'))
      audio.play();

      captureScreen(img => {
        store.dispatch('setScreenshot', img)
      });
    }
  },
  getters: {
    destroyIntervalId(state) {
      return state.destroyIntervalId
    },
    getScreenshot(state) {
      return state.screenshot
    }
  },
  modules: {
  }
})
