import {
  listInfo,
  listContainer,
  placeHolder,
  clearButton,
} from "./appElements.js";
import { saveLocal } from "./appData.js";

/**
 * Обработка содержимого listContainer и отображение в listInfo:
 *
 * @description Симуляция MutationObserver для отслеживания содержимого.
 */
function personalObserver() {
  const tasksQuantity = listInfo.querySelectorAll('.todo-app__counter-value');
  const numberChecked = listContainer.querySelectorAll('.task__content.checked');

  tasksQuantity[0].textContent = `tasks: ${listContainer.childNodes.length}`;
  tasksQuantity[1].textContent = `checked: ${numberChecked.length}`;

  if (listContainer.childNodes.length === 0) {
    placeHolder.textContent = 'Add your task right here~';
    clearButton.setAttribute('disabled', 'disabled');
  }
  if (listContainer.childNodes.length > 0) {
    placeHolder.textContent = 'Keep it up!';
    clearButton.removeAttribute('disabled');
  }

  saveLocal();
}

export { personalObserver }
