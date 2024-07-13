const appFilter = document.querySelector('.todo-app__filter');
const filterButton = appFilter.querySelector('.todo-app__filter-button');
const filterButtonImg = filterButton.firstElementChild;
const filterList = appFilter.querySelector('.todo-app__filter-list');

/**
 * анимация появления списка filterList и переворота стрелки filterButtonImg:
 *
 * @event filterButton#click - непосредственно сама анимация.
 * @event document#click - закртыие filterList при клике вне appFilter.
 */
function filterAnimation() {
  filterButton.addEventListener('click', () => {
    if (filterList.clientHeight == 0) {
      filterListOpening();
    }

    if (filterList.clientHeight != 0) {
      filterListClosing();
    }
  })

  document.addEventListener('click', (e) => {
    // const isFilter = e.target.closest(appFilter);
    const isFilter = appFilter.contains(e.target);
    const isOpen = filterButtonImg.matches('.way-up');

    if (!isFilter && isOpen) {
      filterListClosing();
    }
  });
}

/**
 * Анимация раскрытия:
 */
function filterListOpening() {
  filterButtonImg.classList.remove('way-down');
  filterButtonImg.classList.add('way-up');

  filterList.style.top = 'calc(100% - 1px)';
  filterList.style.maxHeight = '100px';
}

/**
 * Анимация закрытия:
 */
function filterListClosing() {
  filterButtonImg.classList.remove('way-up');
  filterButtonImg.classList.add('way-down');

  filterList.style.top = '0px';
  filterList.style.maxHeight = '0px';
}

/**
 * Замена элементов в appFilter при клике по элементам filterList:
 *
 * @event filterList#click
 */
function filterSwap() {
  filterList.addEventListener('click', (e) => {
    const listItem = e.target;

    if (listItem.matches('.todo-app__filter-element')) {
      const inTheRow = appFilter.querySelector('.todo-app__filter-row span');
      swapping(inTheRow, listItem);
    }

    sortList();
    taskFiltering();

    setTimeout(() => {
      filterListClosing();
    }, 200);
  })
}

/**
 * Замена элементов в appFilter при изменении контента в listContainer по умолчанию:
 */
function refreshFilter() {
  const inTheRow = appFilter.querySelector('.todo-app__filter-row span');

  if (inTheRow.id !== 'all') {
    const listItem = filterList.querySelector('#all');
    swapping(inTheRow, listItem);
  }

  sortList();
  taskFiltering();
}

/**
 * Замена элементов в appFilter:
 *
 * @param {object} inTheRow Строка фильтра filterRow.
 * @param {object} listItem Целевой элемент из списка filterList.
 */
function swapping(inTheRow, listItem) {
  const rowData = {
    id: inTheRow.getAttribute('id'),
    text: inTheRow.textContent
  };

  inTheRow.setAttribute('id', listItem.getAttribute('id'));
  inTheRow.textContent = listItem.textContent;
  listItem.setAttribute('id', rowData.id);
  listItem.textContent = rowData.text;
}

/**
 * Сортировка элементов внутри filterList:
 */
function sortList() {
  const filterListArray = Array.from(filterList.children);
  filterListArray.sort((a, b) => a.textContent.localeCompare(b.textContent));
  const documentFragment = document.createDocumentFragment();

  filterListArray.forEach(element => {
    documentFragment.append(element);
  });
  filterList.replaceChildren(documentFragment);
}

/**
 * Фильтрация элементов task по классу дочернего элемента task__content:
 */
function taskFiltering() {
  /* А теперь. Как это работает?
    inTheRow - получает значение из главной строки фильтра.
    allItems - просто получает NodeList всех task.
    checking - объект для перебора всех task, где по каждому ключу мы получаем значение true/false.
    Затем делаем перебор всех allItems и для каждого element устанавливаем значение либо flex, либо none.
    checking[inTheRow.id] - динамически вызывает метод объекта checking, в зависимости от id у inTheRow.*/
  const inTheRow = appFilter.querySelector('.todo-app__filter-row span');
  const allItems = document.querySelectorAll('.task');

  const checking = {
    all: () => true,
    checked: (element) => element.querySelector('.checked') !== null,
    unchecked: (element) => element.querySelector('.unchecked') !== null
  };

  allItems.forEach(element => {
    element.style.display = checking[inTheRow.id](element) ? 'flex' : 'none';
  });
}

/**
 * Поведение taskFilter по умолчанию при загрузке страницы:
 *
 * @event document#DOMContentLoaded - у всех task свойство display = 'flex'.
 */
function resetlistContainer() {
  document.addEventListener("DOMContentLoaded", () => {
    const allItems = document.querySelectorAll('.task');
    allItems.forEach(element => {
      element.style.display = 'flex';
    });
  });
}

/**
 * Инициализация модуля taskFilter:
 */
function taskFilterInit() {
  filterAnimation();
  filterSwap();
  resetlistContainer();
}

export { taskFilterInit, refreshFilter, taskFiltering };
