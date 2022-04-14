"use strict"

// TODO СКИДЫВАЮ КЛАСС ПРЕД-ЗАГРУЗКИ ДЛЯ СКИПА АНИМАЦИИ
setTimeout(function () {
  document.querySelector('.preload').classList.remove('preload');
}, 250)

// TODO ОБНАРУЖЕНИЕ МОБИЛЬНХ УСТРОЙСТВ
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
}

// TODO СКРИПТ ДЛЯ РАЗДЕЛЕНИЯ ПО ТИПУ УСТРОЙСТВ
if (isMobile.any()) {
  document.body.classList.add('_touch');

  // ? ПОЛУЧАЕМ МАССИВ ОБЪЕКТОВ ДЛЯ МЕНЮ
  let menuArrows = document.querySelectorAll('.menu__arrow');
  if (menuArrows.length > 0) {
    for (let index = 0; index < menuArrows.length; index++) {

      const menuArrow = menuArrows[index];

      // ? ОБРОБОТЧИК СОБЫТИЙ ДЛЯ ДИНАМИЧНОГО TOGGLE МЕНЮ
      menuArrow.addEventListener("click", function (e) {

        // ? ЗАКРЫТИЕ ПРИ КЛИКЕ
        if (menuArrow.parentElement.classList.contains('_active')) {
          menuArrow.parentElement.classList.remove('_active');
          return;
        }

        // ? ЗАКРЫТИЕ ВСЕХ АКТИВНЫХ ОТКРЫТИЕМ НОВОГО - ПЕРЕКЛЮЧЕНИЕ
        for (let i = 0; i < menuArrows.length; i++) {
          if (menuArrows[i].parentElement.classList.contains('_active')) {
            menuArrows[i].parentElement.classList.remove('_active');
          }
        }

        // ? ОТКРЫТИЕ НУЖНОГО TOGGLE МЕНЮ ПО КЛИКУ
        menuArrow.parentElement.classList.toggle('_active');
      }, false)
    }
  }

} else {
  document.body.classList.add('_pc');
}

// TODO ПРОКРУТКА ПРИ КЛИКЕ
const menuAnchors = document.querySelectorAll('a[data-goto]');
for (let menuAnchor of menuAnchors) {
  menuAnchor.addEventListener('click', function (e) {
    // ? ДЕЙСТВИЕ ПО УМОЛЧАНИЮ НЕ ДОЛЖНО ВЫПОЛНЯТЬСЯ
    e.preventDefault();

    // ? ССЫЛКА НА ОБЪЕКТЫ ПО DATA-GOTO
    const dataSet = document.querySelector(menuAnchor.dataset.goto);

    // ? ПРОВЕРКА ОТКРЫТОГО МЕНЮ
    if (burgerMenu.classList.contains('_active')) {
      document.body.classList.remove('_lock');
      burgerMenu.classList.remove('_active');
      menuDropout.classList.remove('_active');
    }

    // ? ПЛАВНЫЙ СКРОЛЛ К КОНКРЕТНОМУ ЭЛЕМЕНТУ
    dataSet.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }, false)
}

// TODO КНОПКА ВОЗВРАЩЕНИЯ НАВЕРХ
const goToTopBtn = document.querySelector('.main__link-up');
const header = document.querySelector('.header');
window.addEventListener('scroll', trackScroll, false);

function trackScroll(e) {
  e.preventDefault();
  let scrolled = window.pageYOffset;
  // ? ПОЛУЧАЮ ВЫСОТУ HEADER И ВЫЧИТАЮ 1 ДЛЯ ПОЯВЛЕНИЯ КНОПКИ ПРИ КЛИКЕ НА ANCHOR
  let topIndent = 99;

  if (scrolled > topIndent) {
    goToTopBtn.classList.add('_show');
  }
  if (scrolled < topIndent) {
    goToTopBtn.classList.remove('_show');
  }
}

// TODO ПРОПИСВАЮ ПЛАВНУЮ ПРОКРУТКУ ВВЕРХ ПРИ НАЖАТИИ НА ПОЯВИВШУЮСЯ КНОПКУ
goToTopBtn.addEventListener('click', backToTop, false);

function backToTop(e) {
  e.preventDefault();

  header.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

// TODO ДОБАВЛЯЮ HR ЭЛЕМЕНТ В НАЧАЛО СПИСКА SUB-LIST НА ЭКРАНАХ ДО 768
if (document.documentElement.clientWidth < 768) {

  let hrElement = document.querySelectorAll('.menu__sub-list');
  hrElement.forEach(i => {
    let newUpHr = document.createElement('hr');
    i.insertAdjacentElement('afterbegin', newUpHr);
  })
  hrElement.forEach(i => {
    let newUpHr = document.createElement('hr');
    i.insertAdjacentElement('beforeend', newUpHr);
  })
}

// TODO СОЗДАЮ ТО САМОЕ ПРЕСЛОВУТОЕ БУРГЕР-МЕНЮ!
const burgerMenu = document.querySelector('.burger-menu');
const menuDropout = document.querySelector('.menu');
burgerMenu.addEventListener('click', function (e) {
  document.body.classList.toggle('_lock');
  burgerMenu.classList.toggle('_active');
  menuDropout.classList.toggle('_active');
}, false);

// TODO СКРИПТ КОНВЕРТАЦИИ И СЖАТИЯ ИЗОБРАЖЕНИЙ
function isWebp() {
  function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }
  testWebP(function (support) {
    if (support == true) {
      document.querySelector('body').classList.add('webp');
    } else {
      document.querySelector('body').classList.add('no-webp');
    }
  });
}
isWebp();

// TODO УКАЗАНИЕ СЛАЙДА ПО УМОЛЧАНИЮ
// TODO КНОПКИ ПРОКРУТКИ
// TODO ЗАЦИКЛЕННОСТЬ ПЕРЕХОДА
// TODO АВТО-ПРОКРУТКА СЛАЙДЕРА
// TODO ПРОКРУТКА СВАЙПОМ

const wrapper = document.querySelector('.slider__wrapper');
const container = document.querySelector('.slider__container');
const track = document.querySelector('.slider__track');
const items = document.querySelectorAll('.slider__item');
const btnPrev = document.querySelector('.slider__control_prev');
const btnNext = document.querySelector('.slider__control_next');

function slide(mainWrapper, prev, next) {
  let posX1 = 0;
  let posX2 = 0;
  let posInitial;
  let posFinal;
  let threshold = 100;
  let slides = track.querySelectorAll('.slider__item');
  let slidesLength = slides.length;
  let slideSize = track.querySelectorAll('.slider__item')[0].offsetWidth;
  let firstSlide = slides[0];
  let lastSlide = slides[slidesLength - 1];
  let cloneFirst = firstSlide.cloneNode(true);
  let cloneLast = lastSlide.cloneNode(true);
  let index = 0;
  let allowShift = true;

  // ? КЛОНИРУЮ ПЕРВЫЕ И ПОСЛЕДНИЕ СЛАЙДЫ В ОЧЕРЕДЬ
  track.appendChild(cloneFirst);
  track.insertBefore(cloneLast, firstSlide);
  mainWrapper.classList.add('loaded');

  // ? СОБЫТИЕ МЫШЬЮ
  track.onmousedown = dragStart;

  // ? СОБЫТИЯ СВАЙПОМ
  track.addEventListener('touchstart', dragStart);
  track.addEventListener('touchend', dragEnd);
  track.addEventListener('touchmove', dragAction);

  // ? СОБЫТИЯ ПО КНОПКАМ
  prev.addEventListener('click', function () { shiftSlide(-1) })
  next.addEventListener('click', function () { shiftSlide(1) })

  track.addEventListener('transitionend', checkIndex);

  // ! ОПИСЫВАЮ СОБЫТИЯ
  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = track.offsetLeft;

    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }
  function dragAction(e) {
    e = e || window.event;

    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }

    track.style.left = (track.offsetLeft - posX2) + "px";
  }
  function dragEnd(e) {
    posFinal = track.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      track.style.left = (posInitial) + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

  // ? ГЛАВНЫЕ ФУНКЦИИ СМЕЩЕНИЯ
  function shiftSlide(dir, action) {
    track.classList.add('shifting');

    if (allowShift) {
      if (!action) {
        posInitial = track.offsetLeft;
      }
      if (dir == 1) {
        track.style.left = (posInitial - slideSize) + "px";
        index++;
      } else if (dir == -1) {
        track.style.left = (posInitial + slideSize) + "px";
        index--;
      }
    };

    allowShift = false;
  }

  function checkIndex() {
    track.classList.remove('shifting');

    if (index == -1) {
      track.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      track.style.left = -(1 * slideSize) + "px";
      index = 0;
    }

    allowShift = true;
  }
}

slide(wrapper, btnPrev, btnNext);

// TODO СОЗДАЮ ИНДИКАТОРЫ ПРОКРУТКИ В ЗАВИСИМОСТИ ОТ КОЛИЧЕСТВА СЛАЙДОВ
const indicators = document.querySelector('.slider__indicators');

for (let i = 0; i != items.length; i++) {
  // ? СОЗДАЮ ПОЛОСКУ ИНДИКАТОРА
  let indicatorLine = document.createElement('span');
  indicatorLine.classList.add('slider__indicator-line');
  // ? СОЗДАЮ ОБОЛОЧКУ ИНДИКТОРОВ
  let indicatorCase = document.createElement('button');
  indicatorCase.classList.add('slider__indicator-case');
  indicatorCase.setAttribute('href', '#');
  indicatorCase.appendChild(indicatorLine);
  // ? НАКОНЕЦ ДОБАВЛЯЮ ПАРТИЮ ГОТОВЫХ РЕБЯТ В РОДИТЕЛЯ
  indicators.appendChild(indicatorCase);
}

//# sourceMappingURL=app.js.map
