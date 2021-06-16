import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { Action } from '../common/type'
import { SEND_MSG } from '../common/event'

const defaultWinOpts: BrowserWindowConstructorOptions = {
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      // 这个东西必须显式地置为false，才能在渲染进程里用require
      // 搞笑的是默认就是false，但不显式地说明，还是会报错
      contextIsolation: false
    }
  }

function createWin(key: string, opts = defaultWinOpts) {
    let win = global.wins[key]
    if (win) {
        win.focus()
    } else {
        win = new BrowserWindow({ ...defaultWinOpts, ...opts })
        win.loadURL(`${global.baseUrl}${key === "main" ? "" : "/" + key}`)
        !(app.isPackaged) && win.webContents.openDevTools()
        global.wins[key] = win
        win.on("closed", () => {
            if (key === "main") {
                if (process.platform === "darwin") {
                    app.quit()
                }
            } else {
                global.wins[key] = null
            }
        })
    }
}

function closeWin(key: string) {
    let win = global.wins[key]
    win?.close()
}

function sendMsg(key: string, action: Action) {
    let win = global.wins[key]
    win?.webContents.send(SEND_MSG, action)
}

export {
    createWin,
    closeWin,
    sendMsg
}