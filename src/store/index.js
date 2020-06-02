import Vue from 'vue'
import Vuex from 'vuex'
import captureScreen from '@/services/captureScreen.js'

import { webFrame, remote } from 'electron'

Vue.use(Vuex)

let shutterSound = new Audio(require('@/assets/shutter_sound1.ogg'))

export default new Vuex.Store({
  state: {
    screenshots: [],
    mouseActive: false,
    destroyIntervalId: null,
  },
  mutations: {
    setScreenshots(state, data) {
      // let copy = state.screenshots.slice();
      // val;
      // copy.push(val);
      // state.screenshots = copy;
      // copy = null;
      state.screenshots.push(data);
      state.screenshots = state.screenshots.slice(0,2);  
      // console.log(state.screenshots.size)
    },
    resetScreenshots(state) {
      console.log(webFrame.getResourceUsage())
      state.screenshots = [];
      remote.getCurrentWindow().webContents.session.clearCache(() => {
        console.log("cache cleared")
      })
      webFrame.clearCache();
      console.log(webFrame.getResourceUsage())
    },
    setMouseActive(state, bool) {
      state.mouseActive = bool
    },
    setDestroyIntervalId(state, id) {
      state.destroyIntervalId = id
    } 
  },
  actions: {
    // setScreenshot(store, val) {
    //   store.commit('setScreenshots', val)
    // },
    resetScreenshots(store) {
      store.commit('resetScreenshots')
    },
    makeScreenshots(store) {
      store.dispatch('resetScreenshots');

      shutterSound.play();

      captureScreen(img => {
        store.commit('setScreenshots', {timestamp: Date.now(), img: img})
      });
    }
  },
  getters: {
    destroyIntervalId(state) {
      return state.destroyIntervalId
    },
    getScreenshotCount(state) {
      return state.screenshots.length
    },
    getScreenshots(state) {
      return state.screenshots
    },
    getScreenshotByTimestamp(state) {
      return keyword => state.screenshots.filter(item => {
        return item.timestamp === keyword
      })[0]
    }
  },
  modules: {
  }
})
