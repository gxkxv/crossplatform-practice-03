// Главный процесс (main process) приложения Electron File Explorer
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs/promises');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    title: 'Electron File Explorer',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,   // изоляция контекста (по умолчанию true)
      nodeIntegration: false,   // Node.js недоступен в renderer (по умолчанию false)
      sandbox: true
    }
  });
  mainWindow.loadFile('index.html');
}

// Чтение каталога средствами Node.js (fs.readdir — POSIX-подобный вызов)
async function readDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .map(e => ({ name: e.name, isDir: e.isDirectory() }))
    .sort((a, b) => (b.isDir - a.isDir) || a.name.localeCompare(b.name));
}

// Задание 3: чтение каталога по запросу renderer-процесса
ipcMain.handle('list-dir', async (event, dir) => {
  const target = path.resolve(dir || '.');
  return { dir: target, entries: await readDirectory(target) };
});

// Задание 4, вариант 1: системный диалог выбора каталога
ipcMain.handle('choose-dir', async () => {
  const win = BrowserWindow.getFocusedWindow() || mainWindow;
  const result = await dialog.showOpenDialog(win, {
    title: 'Выберите каталог',
    properties: ['openDirectory']
  });
  if (result.canceled || result.filePaths.length === 0) {
    return null; // пользователь нажал «Отмена»
  }
  const dir = result.filePaths[0];
  return { dir, entries: await readDirectory(dir) };
});

app.whenReady().then(() => {
  createWindow();
  // macOS: при щелчке по значку в Dock окно создаётся заново
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Windows и Linux: закрытие всех окон завершает приложение; macOS — нет
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
