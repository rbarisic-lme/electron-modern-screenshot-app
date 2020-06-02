import Vue from 'vue'
import App from './App.vue'
import store from './store'

// import {electron, BrowserWindow} from 'electron'
import { remote } from 'electron'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import UniqueId from 'vue-unique-id';

Vue.use(UniqueId);

// import mitt from 'mitt'

Vue.prototype.$remote = remote;

import {Tooltip, TooltipOn} from '@/directives/Tooltip.js'

Vue.directive('tooltip', Tooltip)
Vue.directive('tooltip-on', TooltipOn)

const requireIcon = require.context(
  // The relative path of the components folder
  './components/icons',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /[A-Z]\w+\.(vue|js)$/
)

requireIcon.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireIcon(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )


  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})

let setIgnoreMouseEvents = remote.getCurrentWindow().setIgnoreMouseEvents

var t

window.addEventListener('mousemove', e => {
  if (e.target === document.documentElement) {
    setIgnoreMouseEvents(true, {forward: true})
    if (t) clearTimeout(t)
    t = setTimeout(function() {
      setIgnoreMouseEvents(false)
    }, 150)
  } else setIgnoreMouseEvents(false)
})

Vue.config.productionTip = false

console.log('loaded')

new Vue({
  store,
  // mitt,
  
  render: h => h(App)
}).$mount('#app')
