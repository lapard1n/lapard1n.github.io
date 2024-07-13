import {
  todoApp,
  listContainer,
} from "./appElements.js";
import { personalObserver } from "./personalObserver.js";

/**
 * Добавление свойств перетаскивания элемента:
 *
 * @param {object} e Объект события.
 */
function setDrag(e) {
  const task = e.target.closest('.task');
  const eventBtn = task.querySelector('img.unchanging');

  if (e.target.closest('.dragging') !== null) {
    task.setAttribute('draggable', 'true');

    if (e.target.closest('.task_editing') !== null) {
      task.querySelector('.todo-app__row_editor').remove();
      task.querySelector('p').style.display = 'block';

      eventBtn.classList.toggle('unchanging');
      eventBtn.classList.toggle('changing');
      eventBtn.style.opacity = '100%';

      task.classList.remove('task_editing');
    }
  }
}

/**
 * Удаление свойств перетаскивания элемента:
 *
 * @param {object} e Объект события.
 */
function remDrag(e) {
  const draggable = listContainer.querySelector('[draggable="true"]');

  if (draggable !== null) {
    draggable.classList.remove('task_dragging');
    draggable.classList.remove('hide_drag');
    draggable.setAttribute('draggable', 'false');
  }
}

/**
 * Механизм перетаскивания элемента HTML Drag and Drop API:
 */
function dragAndDrop() {
  const tasks = listContainer.querySelectorAll('.task');
  const heightsForScroll = {
    window: document.documentElement.clientHeight,
    header: document.querySelector('header.header').offsetHeight,
    footer: document.querySelector('footer.footer').offsetHeight,
    list: listContainer.getBoundingClientRect(),

    get listTop() { return this.list.top },
    get listBot() { return this.list.bottom },
    get gapBot() { return this.window - this.footer },
    get gapTop() { return this.window - this.gapBot }
  }

  tasks.forEach(task => {
    task.addEventListener('dragstart', (e) => {
      todoApp.style.marginBottom = `${Math.round(task.offsetHeight / 10) * 10}px`;
      task.classList.add('task_dragging');

      const dragPanel = e.target.querySelector('.dragging');
      let dragBtn = dragPanel.getBoundingClientRect();
      let taskRect = task.getBoundingClientRect();
      let x = dragBtn.left - taskRect.left + dragBtn.width / 2;
      let y = dragBtn.top - taskRect.top + dragBtn.height / 2;
      e.dataTransfer.setDragImage(task, x, y);

      setTimeout(() => task.classList.add('hide_drag'), 0);
    });

    task.addEventListener('dragend', (e) => {
      todoApp.style.marginBottom = `0`;
      task.classList.remove('hide_drag');
      task.classList.remove('task_dragging');
      task.setAttribute('draggable', 'false');

      personalObserver();
    });
  })

  listContainer.addEventListener('dragover', (e) => {
    e.preventDefault();

    const draggingItem = document.querySelector(".task_dragging");
    const siblings = [...listContainer.querySelectorAll(".task:not(.task_dragging)")];

    const nextSibling = siblings.find(sibling => {
      const siblingRect = sibling.getBoundingClientRect();
      return e.clientY <= siblingRect.top + siblingRect.height / 2;
    });

    listContainer.insertBefore(draggingItem, nextSibling);
  });

  document.addEventListener('dragover', (e) => {
    const draggingItem = document.querySelector(".task_dragging");
    const scrollSpeed = draggingItem.offsetHeight * 2;

    function windowScroll(speed) {
      window.scrollBy({
        top: speed,
        left: 0,
        behavior: "smooth"
      });
    }

    if (e.clientY < heightsForScroll.gapTop) {
      windowScroll(-scrollSpeed);
    } else if (e.clientY > heightsForScroll.gapBot) {
      windowScroll(scrollSpeed);
    }
  })
}

/**
 * Инициализация модуля dragAndDrop:
 *
 * @event listContainer#mousedown
 * @event document#mouseup
 */
function dragAndDropInit() {
  listContainer.addEventListener('mousedown', setDrag);
  setTimeout(() => {
    dragAndDrop();
  }, 0);
  document.addEventListener('mouseup', remDrag);
}

export { dragAndDropInit }
