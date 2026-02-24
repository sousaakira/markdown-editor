export class FileOperations {
  get api() {
    return window.electronAPI?.file
  }

  async listDir(dirPath) {
    if (!this.api) return { success: false, files: [] }
    try {
      const result = await this.api.listDir(dirPath)
      return result.success ? result : { success: false, files: [] }
    } catch (error) {
      return { success: false, files: [] }
    }
  }

  async openFileByPath(filePath) {
    if (!this.api) return { success: false, error: 'Electron API not available' }
    try {
      const contentResult = await this.api.readFile(filePath)
      if (contentResult.success) {
        return { success: true, filePath, content: contentResult.content }
      }
      return { success: false, error: contentResult.error }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  async openFile() {
    if (!this.api) return { success: false, error: 'Electron API not available' }
    try {
      const result = await this.api.openDialog()
      if (result.canceled || !result.filePaths?.length) {
        return { success: false }
      }
      const filePath = result.filePaths[0]
      const contentResult = await this.api.readFile(filePath)
      if (contentResult.success) {
        return { success: true, filePath, content: contentResult.content }
      }
      return { success: false, error: contentResult.error }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  async saveFile(filePath, content) {
    if (!this.api) return { success: false, error: 'Electron API not available' }
    try {
      return await this.api.writeFile(filePath, content)
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  async confirmUnsaved() {
    if (!this.api) return 'cancel'
    try {
      return await this.api.confirmUnsaved()
    } catch {
      return 'cancel'
    }
  }

  async saveFileAs(content) {
    if (!this.api) return { success: false, error: 'Electron API not available' }
    try {
      const result = await this.api.saveDialog()
      if (result.canceled || !result.filePath) {
        return { success: false }
      }
      const saveResult = await this.api.writeFile(result.filePath, content)
      return saveResult.success
        ? { success: true, filePath: result.filePath }
        : saveResult
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}
