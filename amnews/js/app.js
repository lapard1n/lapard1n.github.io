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


//# sourceMappingURL=app.js.map
