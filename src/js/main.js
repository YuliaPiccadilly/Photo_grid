'use strict';

$(document).ready(function() {
  $('.header__search, .header__close').click(function(event) {
      $('.header__input').toggleClass('header__input-show');
  });
  $('.contacts__close').click(function(event) {
    $('.contacts__desc').toggleClass('hide');
  });
  $('.header__nav-tablet-btn').click(function(event) {
    $('.menu').toggleClass('menu-active');
  });
  $('.header__search-mobile').click(function(event) {
    $('.header__search-mobile, .header__logo').toggleClass('hide');
  });
  $('.header__search-mobile').click(function(event) {
    $('.header__inp-tablet').addClass('header__inp-tablet-active');
  });
  $('.header__close').click(function(event) {
    $('.header__search-mobile, .header__logo').removeClass('hide');
  });
  $('.header__close').click(function(event) {
    $('.header__inp-tablet').toggleClass('header__inp-tablet-active');
  });
});

// let burger = document.querySelector('.header__nav-tablet-btn');
// let menu = document.querySelector('.menu');

// burger.addEventListener('click', function () {
//   menu.classList.toggle('active');
// });


document.addEventListener('DOMContentLoaded', () => {
  // lazyload для яндекс-карты
  function showMap() {
    const mapWrap = document.querySelector('.contacts__left');
    if (mapWrap.getBoundingClientRect().top - document.documentElement.clientHeight < 0) {
      ymaps.ready(init);
      this.removeEventListener('scroll', showMap);
    }
  }
  window.addEventListener('scroll', showMap);

  function init() {
    // Создание карты.
    const myMap = new ymaps.Map("map", {
      center: [55.76963601332982, 37.63668850000002],
      controls: [],
      zoom: 15
    });


    const myPlacemark = new ymaps.Placemark([55.770422290727126, 37.6359635584614], {
      hintContent: '107045, Москва, Даев переулок, дом 41,<br> бизнес-центр «Даев Плаза», этаж 8, офис № 82 '
    },
      {
        iconLayout: 'default#image',
        iconImageHref: 'imgs/sprite.svg#ya_marker',
        iconImageSize: [12, 12],
        iconImageOffset: [-3, -12]
      });

      // const myGeoObject = new ymaps.GeoObject({
      //   geometry: {
      //     type: "Point", // тип геометрии - точка
      //     coordinates: [55.770422290727126, 37.6359635584614] // координаты точки
      //   }
      // });

    myMap.geoObjects.add(myPlacemark);
  }
});


//валидация
new JustValidate('.about__form', {
  colorWrong: '#F06666',
  rules: {
      mail: {
          required: true,
          email: true
          },
      },
      messages: {
      email: {
          required: 'Недопустимый формат'
      },
  },

});

new JustValidate('.contacts__form', {
  colorWrong: '#F06666',
  rules: {
      name: {
          // rule: 'customRegexp',
          // value: /^[A-zА-яЁё_ ]+$/i,
          required: true,
          minLength: 2,
          maxLength: 10
      },
      mail: {
          required: true,
          email: true
          },
      },
      messages: {
      email: {
          required: 'Недопустимый формат',
          // errorMessage: 'Недопустимый формат'
      },
      name: {
          required: 'Недопустимый формат'
      }

  },

});

