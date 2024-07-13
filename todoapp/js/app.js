import { showLocal } from "./todoApp/appData.js";
import { inputBoxInit } from "./todoApp/inputBox.js";
import { taskFilterInit } from "./todoApp/taskFilter.js";
import { listContainerInit } from "./todoApp/listContainer.js";
import { dragAndDropInit } from "./todoApp/dragAndDrop.js";
import { listInfoInit } from "./todoApp/listInfo.js";
import { upDownScroll } from "./todoApp/upDownButton.js";
import { oopsError } from "./pageState/temporaryCrutch.js";

function pageInit() {
  // Уупс, кажется что-то не работает...
  oopsError();
}
pageInit();

function appInit() {
  // Загрузка данных из localStorage:
  document.addEventListener("DOMContentLoaded", showLocal);

  // Управление вводом текста в inputBox:
  inputBoxInit();

  // Фильтрация элементов в listContainer:
  taskFilterInit();

  // Создание и добавление элемента в listContainer из текста inputBox:
  listContainerInit();

  // Функционал перетаскивания элементов task в listContainer:
  dragAndDropInit();

  // Отображение количества task в listInfo и очистка listContainer:
  listInfoInit();

  // Кнопка прокрутка страницы:
  upDownScroll();
}
appInit();
