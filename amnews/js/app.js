"use strict"

// TODO ПОДКЛЮЧАЮ БИБЛИОТЕКУ СО СТАТУС-БАРОМ ЗАГРУЗКИ
$(document).ready(function () {
  NProgress.start();
});
$(window).on('load', function () {
  NProgress.done(true);
});

// TODO СКИДЫВАЮ КЛАСС ПРЕД-ЗАГРУЗКИ ДЛЯ СКИПА АНИМАЦИИ
setTimeout(function () {
  document.querySelector('.preload').classList.remove('preload');
}, 250)

// TODO SLIDER КНОПКА
const sliderBtn = document.querySelector('.slider__link-down');
window.onload = () => {
  window.setTimeout(() => {
    sliderBtn.classList.add('show');
  }, 300)
}

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
  const menuArrows = document.querySelectorAll('.menu__arrow');
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
const options = { threshold: 1.0 }

const observeCallback = function (entries, observer) {
  entries.forEach(entry => {
    // ? СВОЙСТВА ОБЪЕКТА IntersectionObserver
    const {
      // ? ДОСТУП К ОТСЛЕЖИВАЕМОМУ ЭЛЕМЕНТУ
      target,
      // ? true ЕСЛИ ОТСЛЕЖИВАЕМЫЙ ЭЛЕМЕНТ ПЕРЕСЕКАЕТ viewport ХОТЯ БЫ НА 1 px
      isIntersecting
    } = entry;

    if (isIntersecting) {
      goToTopBtn.classList.remove('show');
    } else {
      goToTopBtn.classList.add('show');
    }
  });
}

const observer = new IntersectionObserver(observeCallback, options);
observer.observe(header);

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

  const hrElement = document.querySelectorAll('.menu__sub-list');
  hrElement.forEach(i => {
    const newUpHr = document.createElement('hr');
    i.insertAdjacentElement('afterbegin', newUpHr);
  })
  hrElement.forEach(i => {
    const newUpHr = document.createElement('hr');
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

// TODO СТИЛИЗУЮ FOOTER С ПОМОЩЬЮ СКРИПТОВ
// ? УСТАНАВЛИВАЮ ВЫСОТУ ЭЛЕМЕНТА ПО САМОМУ БОЛЬШОМУ
const footerLine = document.querySelector(".footer__line");
const footerInfo = document.querySelector(".footer__info");
const footerHeight = document.querySelector(".footer__input-case").offsetHeight;

footerLine.style.height = (footerHeight - 70) + "px";
footerInfo.style.height = footerHeight + "px";

// ? АНИМИРУЮТ LABEL ПРИ ОЧИСТКЕ ПОЛЯ INPUT
const footerInput = document.querySelectorAll(".footer__input");
const footerLabel = document.querySelectorAll('.footer__label');
const footerReset = document.querySelector('buttun.footer__submit');

footerInput.forEach(input => {
  input.addEventListener('input', function (e) {
    input.nextSibling.nextSibling.classList.add("input-active");
    if (input.value == '') {
      input.nextSibling.nextSibling.classList.remove("input-active");
    }
  }, false);
  footerReset.addEventListener('click', function (e) {
    input.value = '';
    input.nextSibling.nextSibling.classList.remove("input-active");
  }, false);
})




const wrapper = document.querySelector('.slider__wrapper');
const track = document.querySelector('.slider__track');
const items = document.querySelectorAll('.slider__item');
const btnPrev = document.querySelector('.slider__control_prev');
const btnNext = document.querySelector('.slider__control_next');
const indicators = document.querySelector('.slider__indicators');

// TODO ОСНОВНАЯ ФУНКЦИЯ РАБОТЫ СЛАЙДЕРА
function slide() {
  let posX1 = 0;
  let posX2 = 0;
  let posInitial;
  let posFinal;
  let threshold = 100;
  let slidesLength = items.length;
  let slideSize = items[0].offsetWidth;
  let firstSlide = items[0];
  let lastSlide = items[slidesLength - 1];
  let cloneFirst = firstSlide.cloneNode(true);
  let cloneLast = lastSlide.cloneNode(true);
  let index = 0;
  let allowShift = true;

  // ? КЛОНИРУЮ ПЕРВЫЕ И ПОСЛЕДНИЕ СЛАЙДЫ В ОЧЕРЕДЬ
  track.insertBefore(cloneLast, firstSlide); // ДО
  track.appendChild(cloneFirst); // ПОСЛЕ

  // ? КОГДА СЛАЙДЫ КЛАНИРОВАНЫ ПРИМЕНЯЕМ СТИЛИ
  wrapper.classList.add('loaded');

  // ? СОБЫТИЕ ДЛЯ МЫШИ
  track.onmousedown = dragStart;

  // TODO ИНИЦИАЛИЗАЦИЯ СОБЫТИЙ
  // ? СОБЫТИЯ ДЛЯ СВАЙПОВ
  track.addEventListener('touchstart', dragStart);
  track.addEventListener('touchmove', dragAction);
  track.addEventListener('touchend', dragEnd);

  // ? СОБЫТИЯ ПО КНОПКАМ
  btnPrev.addEventListener('click', function () {
    shiftSlide("prev", "click");
  })
  btnNext.addEventListener('click', function () {
    shiftSlide("next", "click");
  })

  track.addEventListener('transitionend', checkIndex);

  // TODO ПЕРЕКЛЮЧЕНИЕ СЛАЙДОВ ПО ИНДИКАТОРАМ
  // ? ИНДИКАТОРЫ ПРОКРУТКИ В ЗАВИСИМОСТИ ОТ КОЛИЧЕСТВА СЛАЙДОВ
  for (let i = 0; i != items.length; i++) {
    // ? СОЗДАЮ ПОЛОСКУ ИНДИКАТОРА
    const indicatorLine = document.createElement('span');
    indicatorLine.classList.add('slider__indicator-line');
    // ? СОЗДАЮ ОБОЛОЧКУ ИНДИКТОРОВ
    const indicatorCase = document.createElement('div');
    indicatorCase.classList.add('slider__indicator-case');
    indicatorCase.setAttribute('data-index', i);
    if (i == 0) {
      indicatorCase.classList.add('active');
    }
    indicatorCase.setAttribute('href', '#');
    indicatorCase.appendChild(indicatorLine);
    // ? НАКОНЕЦ ДОБАВЛЯЮ ПАРТИЮ ГОТОВЫХ РЕБЯТ В РОДИТЕЛЯ
    indicators.appendChild(indicatorCase);
    indicatorCase.addEventListener('click', function (e) {
      shiftIndicator(e.currentTarget);
    })
  }
  const papa = document.querySelectorAll('div.slider__indicator-case');

  // TODO ПРОКРУТКА СВАЙПОМ
  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = track.offsetLeft;
    track.classList.add('active');

    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmousemove = dragAction;
      document.onmouseup = dragEnd;
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
      shiftSlide("next", "swipe");
    } else if (posFinal - posInitial > threshold) {
      shiftSlide("prev", "swipe");
    } else {
      track.style.left = (posInitial) + "px";
    }

    document.onmousemove = null;
    document.onmouseup = null;
    track.classList.replace('active', 'unactive');
  }

  // TODO КНОПКИ ПРОКРУТКИ
  function shiftSlide(dir, action) {
    track.classList.add('shifting');

    if (allowShift) {
      // ? УСЛОВИЕ ОБНУЛЕНИЯ НАЧАЛЬНОЙ ПОЗИЦИИ ТОЛЬКО ДЛЯ КНОПОК*
      if (action == "click") {
        posInitial = track.offsetLeft;
      }
      // ? УСЛОВИЕ САМОЙ ПРОКРУТКИ
      if (dir == "next") {
        track.style.left = (posInitial - slideSize) + "px";
        index++;
      } else if (dir == "prev") {
        track.style.left = (posInitial + slideSize) + "px";
        index--;
      }
    }

    shiftIndicator();
    allowShift = false;
  }

  function shiftIndicator(qwerty) {
    track.classList.add('shifting');

    if (allowShift) {
      papa.forEach(pipa => {
        if (pipa.dataset.index == index) {
          pipa.classList.add('active');
        } else {
          pipa.classList.remove('active');
        }
      })

      let dataIndex = qwerty.dataset.index;
      // track.style.left = (-1100) * (dataIndex + 1) + "px";
      if (dataIndex == 0) {
        track.style.left = (-1100) + "px";
      } else if (dataIndex == 1) {
        track.style.left = (-2200) + "px";
      } else if (dataIndex == 2) {
        track.style.left = (-3300) + "px";
      } else if (dataIndex == 3) {
        track.style.left = (-4400) + "px";
      } else if (dataIndex == 4) {
        track.style.left = (-5500) + "px";
      }
      index = dataIndex;
    }

    allowShift = false;
  }

  // TODO ЗАЦИКЛЕННОСТЬ ПЕРЕХОДА И СБРОС АНИМАЦИИ
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

  // ! НАСТРОИТЬ РАБОТУ СЛАЙДЕРА НА РАЗНЫХ ТИПАХ УСТРОЙСТВ

  // TODO АВТО-ПРОКРУТКА СЛАЙДЕРА
  // ? ОПИСЫВАЮ ВРЕМЯ И РАБОТУ ИНТЕРВАЛА
  const timeShift = 7500;
  function autoShift() {
    track.classList.add('shifting');
    posInitial = track.offsetLeft;
    track.style.left = (posInitial - slideSize) + "px";
    index++;
    if (index == (slidesLength + 1)) {
      track.classList.remove('shifting');
      track.style.left = -(1 * slideSize) + "px";
      index = 0;
    }

    console.log('go');
  }
  let timer = setInterval(autoShift, timeShift);

  // ? ОТСЛЕЖИВАЮ РАБОТУ ИНТЕРВАЛА ДЛЯ СВАЙПОВ
  const config = { "attributes": true };
  const observeShift = new MutationObserver(mutationEvent);
  function mutationEvent() {
    if (track.classList.contains('active')) {
      console.log('ОСТАНОВКА!');
      clearInterval(timer);
    } else if (track.classList.contains('unactive')) {
      console.log('ПРОДОЛЖЕНИЕ!');
      timer = setInterval(autoShift, timeShift);
      track.classList.remove('unactive');
    }
  };
  observeShift.observe(track, config);

  // ? ОТСЛЕЖИВАЮ РАБОТУ ИНТЕРВАЛА ПРИ КЛИКАХ ПО КНОПКАМ
  btnPrev.addEventListener('click', function () {
    console.log('ОБНОВИЛ!');
    clearInterval(timer);
    timer = setInterval(autoShift, timeShift);
  });
  btnNext.addEventListener('click', function () {
    console.log('ОБНОВИЛ!');
    clearInterval(timer);
    timer = setInterval(autoShift, timeShift);
  });

  // ? ОТСЛЕЖИВАЮ РАБОТУ ИНТЕРВАЛА ПРИ УХОДЕ СО СТРАНИЦЫ
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === 'hidden') {
      console.log('Вкладка не активна');
      clearInterval(timer);
    } else {
      console.log('Вкладка активна');
      timer = setInterval(autoShift, timeShift);
    }
  });

  // TODO ОПТИМИЗАЦИЯ СЛУШАТЕЛЕЙ СОБЫТИЙ
}

slide()

//# sourceMappingURL=app.js.map
