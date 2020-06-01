import { app, Menu, Tray, ipcMain } from 'electron'
import path from 'path'
import open from 'open'

let tray = null

const trayIcon = function(windowRef) {

  const clickMakeScreenshot = () => {
    windowRef.webContents.send('vuex', 'makeScreenshot')
  }
  const clickHelp = () => {
    open("https://github.com/rbarisic-lme/electron-modern-screenshot-app/blob/master/public/assets/tutorial/tutorial.md");
  }
  const clickAbout = () => {
    open("https://github.com/rbarisic-lme/electron-modern-screenshot-app");
  }
  const clickVisitXrlabs = () => {
    open("https://www.linkedin.com/in/robert-barisic-979434b4/");
  }
  const clickExit = () => {
    app.quit();
  }

  let basepath = app.getAppPath();

  tray = new Tray(path.join(basepath, 'bundled/assets/logo.ico'))
  const contextMenu = Menu.buildFromTemplate([
    // { label: 'Settings', type: 'normal' },
    // { label: '', type: 'separator' },
    { label: 'Take Screenshot', type: 'normal' , click: clickMakeScreenshot },
    { label: '', type: 'separator' },
    { label: 'Help', type: 'normal' , click: clickHelp },
    { label: '', type: 'separator' },
    { label: 'About', type: 'normal' , click: clickAbout },
    { label: 'visit xrlabs', type: 'normal', click: clickVisitXrlabs },
    { label: 'Exit', type: 'normal', click: clickExit },

  ])
  tray.setToolTip('Modern Screenshots. © by xrlabs, 2020')
  tray.setContextMenu(contextMenu)
}


export default trayIcon;