import {
  listContainer,
  placeHolder,
  clearButton
} from "./appElements.js";
const numberCounter = document.querySelector('.todo-app__counter');

/**
 * Сохранение данных в localStorage:
 */
function saveLocal() {
  localStorage.setItem('tasks', listContainer.innerHTML);
  localStorage.setItem('counter', numberCounter.innerHTML);
  localStorage.setItem('placeholder', placeHolder.textContent);
  localStorage.setItem('clear', clearButton.hasAttribute('disabled'));
}

/**
 * Загрузка данных из localStorage, если getItem не указан, то загружаю данные по умолчанию:
 */
function showLocal() {
  listContainer.innerHTML = localStorage.getItem('tasks');

  if (localStorage.getItem('counter') === null) {
    const tasksQuantity = document.querySelectorAll('.todo-app__counter-value');

    tasksQuantity[0].textContent = 'tasks: 0';
    tasksQuantity[1].textContent = 'checked: 0';
  } else {
    numberCounter.innerHTML = localStorage.getItem('counter');
  }

  if (localStorage.getItem('placeholder') === null) {
    placeHolder.textContent = 'Add your task right here~';
  } else {
    placeHolder.textContent = localStorage.getItem('placeholder');
  }

  if (
    localStorage.getItem('clear') === 'true' ||
    localStorage.getItem('clear') === null
  ) {
    clearButton.setAttribute('disabled', 'disabled');
  } else {
    clearButton.removeAttribute('disabled');
  }
}

export { saveLocal, showLocal }
