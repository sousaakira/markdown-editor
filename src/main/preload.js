const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // File operations
  file: {
    openDialog: () => ipcRenderer.invoke('file-open-dialog'),
    openImageDialog: () => ipcRenderer.invoke('file-open-image-dialog'),
    readFileAsDataUrl: (filePath) => ipcRenderer.invoke('file-read-data-url', filePath),
    resolveImageInMarkdown: (markdown, baseDir) => ipcRenderer.invoke('file-resolve-images-in-markdown', markdown, baseDir),
    saveDialog: () => ipcRenderer.invoke('file-save-dialog'),
    readFile: (filePath) => ipcRenderer.invoke('file-read', filePath),
    writeFile: (filePath, content) => ipcRenderer.invoke('file-write', filePath, content),
    listDir: (dirPath) => ipcRenderer.invoke('file-list-dir', dirPath),
    confirmUnsaved: () => ipcRenderer.invoke('file-confirm-unsaved'),
    createNewWindow: () => ipcRenderer.invoke('create-new-window'),

    // Listen for file operations from renderer
    onNewFile: (callback) => ipcRenderer.on('file-new', callback),
    onOpenFile: (callback) => ipcRenderer.on('file-open', callback),
    onSaveFile: (callback) => ipcRenderer.on('file-save', callback),
    onSaveAsFile: (callback) => ipcRenderer.on('file-save-as', callback),
    onOpenFileFromPath: (callback) => ipcRenderer.on('open-file-from-path', (event, filePath) => callback(filePath)),
  },
  
  // Remove listeners when needed
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
})