//     // var s = JSON.stringify
//     // vnode.elm.innerHTML =
//     //   'name: '       + s(binding.name) + '<br>' +
//     //   'value: '      + s(binding.value) + '<br>' +
//     //   'expression: ' + s(binding.expression) + '<br>' +
//     //   'argument: '   + s(binding.arg) + '<br>' +
//     //   'modifiers: '  + s(binding.modifiers) + '<br>' +
//     //   'vnode keys: ' + Object.keys(vnode).join(', ');
//   },

import Vue from 'vue'

let tooltips = {}
let styles = {};
let timers = {}

export const Tooltip = {
  name: 'Tooltip',
  inserted() {

  },
  bind(el, bind, vnode) {
    let uid = vnode.context._uid;

    tooltips[uid] = document.createElement('div');
    tooltips[uid].className = "tooltip";
    // Use this to get real data from the DOM
    Vue.nextTick(function () {
      // DOM updated

      tooltips[uid].innerHTML = `
      <div class="tooltip-content">
      ${bind.value}
      </div>
      `
    })
  },
  update() {

  }
}

export const TooltipOn = {
  name: 'TooltipOn',
  inserted() {
  },
  bind(/*el, bind, vnode*/) {
  },
  update(el, bind, vnode) {
    let uid = vnode.context._uid;

    Vue.nextTick(function () {
      if (bind.value === true) {
        if (timers[uid] !== null) { clearTimeout(timers[uid]); timers[uid] = null;}

      styles[uid] = [
        ['position', 'fixed'],
        ['left', vnode.elm.getBoundingClientRect().x + 'px'],
        ['top', vnode.elm.getBoundingClientRect().y - 32 - 8 + 'px'],
        ['color', '#fff'],
        ['background', '#000'],
        ['padding', '8px']
      ];


        document.getElementById('app').appendChild(tooltips[uid]);

        for(let style of styles[uid]) {
          try {
            tooltips[uid].style[style[0]] = style[1] 
          } catch(err) {
            console.log('Tooltip Error: ' + err.message);
          }
        }

        timers[uid] = setTimeout(() => {
          tooltips[uid].remove();
          console.log(vnode)
          console.log(uid)
        }, 500)
      }
    });
  }
} 