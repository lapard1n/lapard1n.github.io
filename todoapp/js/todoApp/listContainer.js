import {
  listContainer,
  inputBox,
  inputPublish
} from "./appElements.js";
import { personalObserver } from "./personalObserver.js";
import {
  resizeTextarea,
  rowRangeFinder,
  inputBoxListener
} from "./inputBox.js";
import {
  taskFiltering,
  refreshFilter
} from "./taskFilter.js";
import { dragAndDropInit } from "./dragAndDrop.js";
const taskPrototype = document.getElementById('task-prototype');

/**
 * Удаление прототипа task и атрибута прототипа 'id':
 */
function removePrototypeTask() {
  taskPrototype.removeAttribute('id');
  listContainer.innerHTML = '';
}

/**
 * Добавление нового элемента task в listContainer:
 *
 * @param {object} e Объект события.
 */
function addingTask(e) {
  const regExpSpaceCheker = /\S/;

  if (
    e.type === 'click' ||
    (e.key === 'Enter' || e.code === 'Enter') &&
    !e.shiftKey
  ) {
    e.preventDefault();

    if (!inputPublish.hasAttribute('disabled')) {
      const task = taskPrototype.cloneNode(true);
      const taskText = task.querySelector('.task__content p');
      taskText.innerText = inputBox.value.trim();
      listContainer.prepend(task);

      const taskContent = listContainer.querySelector('.task__content');
      if (taskContent.scrollHeight > 125) {
        taskContent.classList.add('task_scrolling');
      }

      inputBox.parentNode.style.height = '30px';
      inputBox.setAttribute('rows', 1);
      inputBox.value = '';
    }

    if (
      !regExpSpaceCheker.test(inputBox.value) &&
      !inputPublish.hasAttribute('disabled')
    ) {
      inputPublish.setAttribute('disabled', 'disabled');
    }

    if (inputPublish.hasAttribute('disabled')) {
      resizeTextarea(inputBox);
      rowRangeFinder(inputBox.parentElement, inputBox);
    }

    dragAndDropInit();
    refreshFilter();
    personalObserver();
  }
}

/**
 * Созданиен панели редактирования текста в task:
 *
 * @param {object} e Объект события.
 */
function changingTask(e) {
  const eventTarget = e.target.closest('.task');
  const textElement = eventTarget.querySelector('.task__content');
  const textItself = textElement.querySelector('p');
  const eventBtn = eventTarget.querySelector('img.changing');
  const newRow = inputBox.parentElement.cloneNode(true);
  const newInput = newRow.querySelector('.todo-app__input');
  const newPublish = newRow.querySelector('.todo-app__publish');

  eventTarget.classList.add('task_editing');
  newRow.classList.add('todo-app__row_editor');
  newInput.value = textItself.innerText;
  newPublish.textContent = 'Edit';
  textElement.classList.remove('task_scrolling');
  textElement.append(newRow);

  eventBtn.classList.toggle('changing');
  eventBtn.classList.toggle('unchanging');
  eventBtn.style.opacity = '40%';

  textItself.style.display = 'none';

  inputBoxListener(newRow, newInput, newPublish);
  newRow.addEventListener('input', () => inputBoxListener(newRow, newInput, newPublish));
}

/**
 * Замена текста из панели редактирования в task:
 *
 * @param {object} e Объект события.
 */
function pasteText(e) {
  const eventTarget = e.target.closest('.task');
  const textElement = eventTarget.querySelector('.task__content');
  const textItself = eventTarget.querySelector('p');
  const eventBtn = eventTarget.querySelector('img.unchanging');
  const newRow = eventTarget.querySelector('.todo-app__row_editor');
  const newInput = newRow.querySelector('.todo-app__input');
  const newPublish = newRow.querySelector('.todo-app__publish');

  if (!newPublish.hasAttribute('disabled')) {
    textItself.innerText = newInput.value.trim();
    newRow.remove();

    eventBtn.classList.toggle('unchanging');
    eventBtn.classList.toggle('changing');
    eventBtn.style.opacity = '100%';

    textItself.style.display = 'block';
    eventTarget.classList.remove('task_editing');
  }

  if (textElement.scrollHeight > 125) {
    textElement.classList.add('task_scrolling');
  }
}

/**
 * Удаление панели редактирования при загрузке страницы:
 *
 * @event document#DOMContentLoaded
 */
function removeEditors() {
  document.addEventListener("DOMContentLoaded", () => {
    const mainTasks = listContainer.querySelectorAll('.task_editing');

    mainTasks.forEach(task => {
      const eventBtn = task.querySelector('img.unchanging');
      task.querySelector('.todo-app__row_editor').remove();
      task.querySelector('p').style.display = 'block';

      eventBtn.classList.toggle('unchanging');
      eventBtn.classList.toggle('changing');
      eventBtn.style.opacity = '100%';

      task.classList.remove('task_editing');
    });
  });
}

/**
 * Делегирование событий для listContainer:
 *
 * @param {object} e Объект события.
 * @fires listContainer#click
 * @fires listContainer#keydown
 */
function tasksEditor(e) {
  const eventTarget = e.target;
  const taskElement = eventTarget.closest('.task');

  if (e.type === 'click') {
    if (eventTarget.matches('.deleting')) {
      taskElement.classList.add('task_deleting');

      setTimeout(() => {
        taskElement.remove();
        personalObserver();
      }, 500);
    }

    if (eventTarget.matches('.changing') && !taskElement.classList.contains('task_dragging')) {
      changingTask(e);
    }

    if (eventTarget.matches('.todo-app__row_editor button')) {
      pasteText(e);
    }

    if (
      eventTarget.matches('.task__content') ||
      eventTarget.matches('p')
    ) {
      const taskContent = taskElement.querySelector('.task__content');

      taskContent.classList.toggle('checked');
      taskContent.classList.toggle('unchecked');
    }

    if (
      (eventTarget.matches('.task__content') ||
        eventTarget.matches('p')) &&
      document.querySelector('.todo-app__filter-element_target').matches('#all') === false
    ) {
      taskElement.classList.toggle('task_deleting');
      setTimeout(() => {
        taskElement.classList.toggle('task_deleting');
        taskFiltering();
        personalObserver();
      }, 500);
    }
  }

  if (
    (e.key === 'Enter' || e.code === 'Enter') &&
    !e.shiftKey &&
    eventTarget.matches('.todo-app__row_editor textarea')
  ) {
    pasteText(e);
  }

  personalObserver();
}

/**
 * Инициализация модуля listContainer:
 */
function listContainerInit() {
  removePrototypeTask();
  inputPublish.addEventListener('click', addingTask);
  inputBox.addEventListener('keydown', addingTask);
  listContainer.addEventListener('click', tasksEditor);
  listContainer.addEventListener('keydown', tasksEditor);
  removeEditors();
}

export { listContainerInit }
