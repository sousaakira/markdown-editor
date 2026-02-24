const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('path')
const fs = require('fs')
const { existsSync } = require('fs')

let mainWindow
let pendingFilePath = null

function getFilePathFromArgs(argv) {
  const isDev = process.env.NODE_ENV === 'development'
  const start = isDev ? 2 : 1
  for (let i = start; i < argv.length; i++) {
    const arg = argv[i]
    if (arg.startsWith('-')) continue
    const resolved = path.isAbsolute(arg) ? arg : path.resolve(process.cwd(), arg)
    if (existsSync(resolved) && /\.(md|markdown)$/i.test(path.extname(resolved))) {
      return resolved
    }
  }
  return null
}

function sendOpenFile(filePath) {
  if (mainWindow && !mainWindow.isDestroyed() && filePath) {
    mainWindow.webContents.send('open-file-from-path', filePath)
  } else {
    pendingFilePath = filePath
  }
}

function createWindow() {
  const iconPath = path.join(__dirname, '..', '..', 'assets', 'icons', 'icon.png')
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true,
    },
    show: false,
  })

  // Load the renderer
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    if (pendingFilePath) {
      mainWindow.webContents.send('open-file-from-path', pendingFilePath)
      pendingFilePath = null
    }
  })

  // Menu template
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New File',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            createWindow()
          }
        },
        {
          label: 'Open File',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            const win = BrowserWindow.getFocusedWindow() || mainWindow
            if (win && !win.isDestroyed()) win.webContents.send('file-open')
          }
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            const win = BrowserWindow.getFocusedWindow() || mainWindow
            if (win && !win.isDestroyed()) win.webContents.send('file-save')
          }
        },
        {
          label: 'Save As',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: () => {
            const win = BrowserWindow.getFocusedWindow() || mainWindow
            if (win && !win.isDestroyed()) win.webContents.send('file-save-as')
          }
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo', label: 'Undo' },
        { role: 'redo', label: 'Redo' },
        { type: 'separator' },
        { role: 'cut', label: 'Cut' },
        { role: 'copy', label: 'Copy' },
        { role: 'paste', label: 'Paste' },
        { role: 'selectall', label: 'Select All' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload', label: 'Reload' },
        { role: 'forcereload', label: 'Force Reload' },
        { role: 'toggledevtools', label: 'Toggle Developer Tools' },
        { type: 'separator' },
        { role: 'resetzoom', label: 'Reset Zoom' },
        { role: 'zoomin', label: 'Zoom In' },
        { role: 'zoomout', label: 'Zoom Out' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Toggle Fullscreen' }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

const gotLock = app.requestSingleInstanceLock()
if (!gotLock) {
  app.quit()
  return
}

app.on('second-instance', (event, commandLine) => {
  const filePath = getFilePathFromArgs(commandLine)
  if (filePath) sendOpenFile(filePath)
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

app.on('open-file', (event, filePath) => {
  event.preventDefault()
  if (/\.(md|markdown)$/i.test(path.extname(filePath))) {
    sendOpenFile(filePath)
  }
})

app.whenReady().then(() => {
  pendingFilePath = getFilePathFromArgs(process.argv)
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// IPC Handlers for file operations
ipcMain.handle('create-new-window', () => {
  createWindow()
  return null
})

ipcMain.handle('file-open-dialog', async (event) => {
  const { dialog } = require('electron')
  const win = BrowserWindow.fromWebContents(event.sender) || mainWindow
  const result = await dialog.showOpenDialog(win, {
    properties: ['openFile'],
    filters: [
      { name: 'Markdown Files', extensions: ['md', 'markdown'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  })
  return result
})

ipcMain.handle('file-save-dialog', async (event) => {
  const { dialog } = require('electron')
  const win = BrowserWindow.fromWebContents(event.sender) || mainWindow
  const result = await dialog.showSaveDialog(win, {
    filters: [
      { name: 'Markdown Files', extensions: ['md'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  })
  return result
})

ipcMain.handle('file-read', async (event, filePath) => {
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8')
    return { success: true, content }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('file-write', async (event, filePath, content) => {
  try {
    await fs.promises.writeFile(filePath, content, 'utf-8')
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('file-confirm-unsaved', async (event) => {
  const { dialog } = require('electron')
  const win = BrowserWindow.fromWebContents(event.sender) || mainWindow
  const result = await dialog.showMessageBox(win, {
    type: 'warning',
    title: 'Alterações não salvas',
    message: 'O documento tem alterações não salvas. Deseja salvar?',
    buttons: ['Salvar', 'Não salvar', 'Cancelar'],
    defaultId: 0,
    cancelId: 2,
  })
  return ['save', 'discard', 'cancel'][result.response]
})

ipcMain.handle('file-list-dir', async (event, dirPath) => {
  try {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true })
    const files = entries
      .filter((e) => e.isFile() && /\.(md|markdown)$/i.test(e.name))
      .map((e) => path.join(dirPath, e.name))
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    return { success: true, files }
  } catch (error) {
    return { success: false, error: error.message, files: [] }
  }
})