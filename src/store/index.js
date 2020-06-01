import Vue from 'vue'
import Vuex from 'vuex'
import captureScreen from '@/services/captureScreen.js'

Vue.use(Vuex)

let shutterSound = new Audio(require('@/assets/shutter_sound1.ogg'))


export default new Vuex.Store({
  state: {
    screenshot: [],
    mouseActive: false,
    destroyIntervalId: null,
  },
  mutations: {
    setScreenshot(state, val) {
      // let copy = state.screenshot.slice();
      // val;
      // copy.push(val);
      // state.screenshot = copy;
      // copy = null;
      state.screenshot.push(val);
      state.screenshot = state.screenshot.slice(0,2);  
      // console.log(state.screenshot.size)
    },
    resetScreenshots(state) {
      state.screenshot = [];
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
      shutterSound.play();

      captureScreen(img => {
        store.commit('setScreenshot', img)
      });
    }
  },
  getters: {
    destroyIntervalId(state) {
      return state.destroyIntervalId
    },
    getScreenshotCount(state) {
      return state.screenshot.length
    },
    getScreenshot(state) {
      return state.screenshot
    }
  },
  modules: {
  }
})
