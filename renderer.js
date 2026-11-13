// Процесс отрисовки: доступ к системе только через window.api (preload)
const list = document.getElementById('list');
const current = document.getElementById('current');

function render(result) {
  list.innerHTML = '';
  current.textContent = 'Каталог: ' + result.dir + ' (элементов: ' + result.entries.length + ')';
  if (result.entries.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = 'Каталог пуст';
    list.appendChild(li);
    return;
  }
  for (const entry of result.entries) {
    const li = document.createElement('li');
    li.className = entry.isDir ? 'dir' : 'file';
    const icon = document.createElement('span');
    icon.className = 'icon';
    icon.textContent = entry.isDir ? '📁' : '📄';
    li.append(icon, document.createTextNode(entry.name));
    list.appendChild(li);
  }
}

function showError(err) {
  list.innerHTML = '';
  const li = document.createElement('li');
  li.className = 'error';
  li.textContent = 'Ошибка: ' + err.message;
  list.appendChild(li);
}

// Задание 3: содержимое рабочего каталога
document.getElementById('btn-list').addEventListener('click', async () => {
  try { render(await window.api.listDir('.')); } catch (e) { showError(e); }
});

// Задание 4 (вариант 1): выбор каталога через системный диалог
document.getElementById('btn-choose').addEventListener('click', async () => {
  try {
    const result = await window.api.chooseDir();
    if (result) render(result);          // null — пользователь отменил выбор
  } catch (e) { showError(e); }
});
