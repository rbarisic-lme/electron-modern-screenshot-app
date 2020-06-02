import { app, Menu, Tray, ipcMain } from 'electron'
import path from 'path'
import open from 'open'

let tray = null
const isDevelopment = process.env.NODE_ENV !== 'production'

let dataPath = "";
if (isDevelopment) {
  dataPath = path.join(__dirname, '../buildResources')
} else {
  dataPath = path.join(process.resourcesPath, 'resources');
}

const trayIcon = function(windowRef) {

  const clickMakeScreenshots = () => {
    windowRef.webContents.send('vuex', 'makeScreenshots')
  }
  const clickHelp = () => {
    open("https://github.com/rbarisic-lme/electron-modern-screenshot-app/blob/master/public/assets/tutorial/tutorial.md");
  }
  const clickAbout = () => {
    open("https://github.com/rbarisic-lme/electron-modern-screenshot-app");
  }
  const clickVisitXrlabs = () => {
    open('http://xrlabs.blogspot.com/')
  }
  const clickVisitAuthor = () => {
    open("https://www.linkedin.com/in/robert-barisic-979434b4/");
  }
  const clickExit = () => {
    app.quit();
  }

  let basepath = app.getAppPath();

  tray = new Tray(path.join(dataPath, 'logo.ico'))
  const contextMenu = Menu.buildFromTemplate([
    // { label: 'Settings', type: 'normal' },
    // { label: '', type: 'separator' },
    { label: 'Take Screenshots', type: 'normal' , click: clickMakeScreenshots },
    { label: '', type: 'separator' },
    { label: 'Help', type: 'normal' , click: clickHelp },
    { label: '', type: 'separator' },
    { label: 'About', type: 'normal' , click: clickAbout },
    { label: 'visit xrlabs', type: 'normal', click: clickVisitXrlabs },
    { label: 'Author on LinkedIn', type: 'normal', click: clickVisitAuthor },
    { label: 'Exit', type: 'normal', click: clickExit },

  ])
  tray.setToolTip('Modern Screenshots. © by xrlabs, 2020')
  tray.setContextMenu(contextMenu)
}


export default trayIcon;