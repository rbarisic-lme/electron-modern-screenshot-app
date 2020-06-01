const { app, Menu, Tray } = require('electron')
let open = require("open");

import path from 'path'

let tray = null
app.on('ready', () => {

  let basepath = app.getAppPath();

  tray = new Tray(path.join(basepath, 'bundled/assets/logo.ico'))
  const contextMenu = Menu.buildFromTemplate([
    // { label: 'Settings', type: 'normal' },
    // { label: '', type: 'separator' },
    { label: 'About', type: 'normal' , click: clickAbout },
    { label: 'visit xrlabs', type: 'normal', click: clickVisitXrlabs },
    { label: 'Exit', type: 'normal', click: clickExit },

  ])
  tray.setToolTip('Modern Screenshots. © by xrlabs, 2020')
  tray.setContextMenu(contextMenu)
})

const clickAbout = () => {
  open("https://github.com/rbarisic-lme/electron-modern-screenshot-app");
}
const clickVisitXrlabs = () => {
  open("https://www.linkedin.com/in/robert-barisic-979434b4/");
}
const clickExit = () => {
  app.quit();
}