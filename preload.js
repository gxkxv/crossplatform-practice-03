// Скрипт предзагрузки: безопасный «мост» между renderer и main
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  listDir: (dir) => ipcRenderer.invoke('list-dir', dir),
  chooseDir: () => ipcRenderer.invoke('choose-dir')
});
