//     // var s = JSON.stringify
//     // el.innerHTML =
//     //   'name: '       + s(binding.name) + '<br>' +
//     //   'value: '      + s(binding.value) + '<br>' +
//     //   'expression: ' + s(binding.expression) + '<br>' +
//     //   'argument: '   + s(binding.arg) + '<br>' +
//     //   'modifiers: '  + s(binding.modifiers) + '<br>' +
//     //   'vnode keys: ' + Object.keys(vnode).join(', ');
//   },

import Vue from 'vue'

let tooltip = document.createElement('div');
let styles = [];
tooltip.className = "tooltip";

export const Tooltip = {
  name: 'Tooltip',
  inserted() {

  },
  bind(el, bind) {
    // Use this to get real data from the DOM
    Vue.nextTick(function () {
      console.log(el.getBoundingClientRect());
      // DOM updated

      styles = [
        ['position', 'fixed'],
        ['left', el.getBoundingClientRect().x + 'px'],
        ['top', el.getBoundingClientRect().y - 32 - 8 + 'px'],
        ['color', '#fff'],
        ['background', '#000'],
        ['padding', '8px']
      ];

      tooltip.innerHTML = `
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
    console.log('TOOLTIP ON ON ON ON')
  },
  bind(el, bind/*, vnode*/) {
    Vue.nextTick(function () {
    if (bind.value === true) {
      document.getElementById('app').appendChild(tooltip);

      for(let style of styles) {
        try {
          tooltip.style[style[0]] = style[1] 
          console.log('success');
        } catch(err) {
          console.log('DB Error: ' + err.message);
        }
      }
    }
    });
  },
  update() {

  }
} 