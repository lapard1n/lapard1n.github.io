import { inputBox, inputPublish } from "./appElements.js";

/**
 * Увеличение размера элемента inputBox:
 *
 * @param {object} thisInput Строка для ввода текста.
 */
function resizeTextarea(thisInput) {
  let rowHeight = window.getComputedStyle(thisInput).lineHeight;
  rowHeight = rowHeight.replace(/\D/g, '');

  if (thisInput.scrollHeight / rowHeight <= 5) {
    thisInput.style.height = 'auto';
    thisInput.style.height = thisInput.scrollHeight + 'px';
    thisInput.parentNode.style.height = 5 + (thisInput.scrollHeight) + 'px';
  } else {
    thisInput.style.height = rowHeight * 5 + 'px';
    thisInput.parentNode.style.height = 5 + (rowHeight * 5) + 'px';
  }
}

/**
 * Подсчет вводимых смволов в строке inputBox:
 *
 * @param {object} thisRow Родитель элемента строки для ввода текста.
 * @param {object} thisInput Строка для ввода текста.
 */
function rowRangeFinder(thisRow, thisInput) {
  const rowRange = thisRow.querySelector('.todo-app__range');
  rowRange.textContent = `${thisInput.value.length}/404`;
}

/**
 * Проверка ввода в поле inputBox:
 *
 * @param {object} thisRow Родитель элемента строки для ввода текста.
 * @param {object} thisInput Строка для ввода текста.
 * @param {object} thisButton Кнопка для взаимодействия с текстом.
 */
function inputBoxListener(thisRow, thisInput, thisButton) {
  const regExpSpaceCheker = /\S/;

  if (
    !regExpSpaceCheker.test(thisInput.value) &&
    !thisButton.hasAttribute('disabled')
  ) {
    thisButton.setAttribute('disabled', 'disabled');
  }

  if (
    regExpSpaceCheker.test(thisInput.value) &&
    thisButton.hasAttribute('disabled')
  ) {
    thisButton.removeAttribute('disabled');
  }

  resizeTextarea(thisInput);
  rowRangeFinder(thisRow, thisInput);
}

/**
 * Инициализация модуля inputBox:
 */
function inputBoxInit() {
  resizeTextarea(inputBox);
  rowRangeFinder(inputBox.parentElement, inputBox);

  /**
  * Слушатель события ввода, для изменения inputBox:
  *
  * @event inputBox#input
  */
  inputBox.addEventListener('input', () => inputBoxListener(inputBox.parentElement, inputBox, inputPublish));
}

export { resizeTextarea, rowRangeFinder, inputBoxListener, inputBoxInit }
