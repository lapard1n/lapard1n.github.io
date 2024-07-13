import {
  listInfo,
  inputBox,
  clearButton,
  listContainer
} from "./appElements.js";
import {
  refreshFilter
} from "./taskFilter.js";
import { personalObserver } from "./personalObserver.js";

/**
 * Делегирование событий для listInfo:
 *
 * @event listInfo#click
 */
function listInfoListener() {
  listInfo.addEventListener('click', (event) => {
    const eventTarget = event.target;

    if (eventTarget.matches('.todo-app__placeholder')) {
      inputBox.focus();
    }

    if (
      (eventTarget.matches('.todo-app__clear') ||
        eventTarget === document.querySelector('.todo-app__strike')) &&
      !eventTarget.hasAttribute('disabled')
    ) {
      const allTasks = document.querySelectorAll('.task');

      allTasks.forEach(element => {
        element.classList.add('task_deleting');
      });

      setTimeout(() => {
        listContainer.innerHTML = '';

        refreshFilter();
        personalObserver();
      }, 500);
    }

    personalObserver();
  })
}

/**
 * Управление анимацией clearButton:
 *
 * @event clearButton#mouseenter - выезд линии на элемент.
 * @event clearButton#mouseleave - уход линии с элемента.
 */
function clearButtonListener() {
  let animeState = false;
  const clearLine = document.querySelector('.todo-app__strike');

  clearButton.addEventListener('mouseenter', () => {
    if (!clearButton.hasAttribute("disabled")) {
      clearLine.style.animation = 'line-animation ease 500ms forwards';
      animeState = true;
    }
  })

  clearButton.parentElement.addEventListener('mouseleave', () => {
    if (animeState == true) {
      clearLine.style.animation = 'reverse-line ease 500ms forwards';
      animeState = false;
    }
  })
}

/**
 * Инициализация модуля listInfo:
 */
function listInfoInit() {
  listInfoListener();
  clearButtonListener();
}

export { listInfoInit }
