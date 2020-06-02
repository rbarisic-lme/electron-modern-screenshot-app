import path from 'path'
import {remote} from 'electron'

export const isDevelopment = function () {
  return process.mainModule.filename.indexOf('app.asar') === -1;
}

export const getRealAppPath = function () {
  if (!isDevelopment()) {
    return path.join(process.env.BASE_URL, '..')
  } else {
    return path.join(remote.app.getAppPath(), './')
  }
}

export const getRealResourcesPath = function () {
  if (!isDevelopment) {
    return path.join(getRealAppPath(), '/resources')
  } else {
    return path.join(getRealAppPath(), '/bundled/assets')
  }
}