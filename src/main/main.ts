import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import {createWin,sendMsg } from './utils'
import { CREATE_WIN, SEND_MSG } from '../common/event'

global.wins = {}

const baseUrl = app.isPackaged
  ? join(__dirname, "../../dist/render/index.html#")
  : `http://localhost:${process.env.PORT}/#`

global.baseUrl = baseUrl

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => createWin("main"))

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWin("main")
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on(CREATE_WIN, (e, arg) => {
  const { key, opts } = arg
  createWin(key, opts)
})

ipcMain.on(SEND_MSG, (e, data) => {
  const { key, action } = data
  sendMsg(key, action)
})