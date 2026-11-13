# crossplatform-practice-03 — Electron File Explorer

**Дисциплина:** Кросс-платформенная разработка
**Работа:** Практическая работа № 3 «Практикум работы с фреймворком Electron»
**Студент:** Ахмедханов Магомедхан Русланович, группа ТРПО23-2
**Вариант:** 1 — кнопка «Выбрать каталог»: системный диалог выбора каталога (`dialog.showOpenDialog`) и вывод его содержимого

## Запуск

```bash
npm install
npm start        # запуск приложения
npm run dist     # сборка дистрибутива (electron-builder) в каталог dist/
```

## Структура

| Файл | Назначение |
|---|---|
| `main.js` | главный процесс: окно `BrowserWindow`, обработчики IPC `list-dir` и `choose-dir` |
| `preload.js` | скрипт предзагрузки: `contextBridge.exposeInMainWorld('api', …)` |
| `renderer.js` | процесс отрисовки: обработчики кнопок, вывод списка |
| `index.html`, `styles.css` | интерфейс |
| `package.json` | манифест проекта, скрипты `start`/`dist`, секция `build` |
