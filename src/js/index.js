var jquery = require("jquery");
const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

window.$ = window.jQuery = jquery;
import 'babel-polyfill';

$(document).ready(() => {
  const menu = $('.menu-nav')[0]
  const menuHeight = menu.offsetHeight + 5

  let lastPageYOffset = pageYOffset
  let transform = 0

  const scrollHandler = (evt) => {

    if ((lastPageYOffset <= pageYOffset) && (pageYOffset > 600)) {
      if (transform <= menuHeight) {
        transform = transform + (pageYOffset - lastPageYOffset)
      } else {
        transform = menuHeight
      }

      menu.style.transform = `translateY(-${transform}px)`
    } else if (lastPageYOffset >= pageYOffset) {
      if (transform >= 0) {
        transform = transform - (lastPageYOffset - pageYOffset)

        if (transform < 0) {
          transform = 0
        }
      }
      menu.style.transform = `translateY(-${transform}px)`
    }

    lastPageYOffset = pageYOffset
  }

  if (window.screen.width >= 690) {
    window.addEventListener('scroll', scrollHandler)
  }

  window.addEventListener("resize", () => {
    if (window.screen.width >= 690) {
      window.addEventListener('scroll', scrollHandler)
    } else {
      window.removeEventListener('scroll', scrollHandler)
    }
  })

  // menu
  $('.menu-btn').on('click', function (e) {
    e.preventDefault();
    $('.menu').toggleClass('menu_active');
    if ($('.menu').hasClass("menu_active")) {
      // disableBodyScroll();
      document.body.style.overflow = 'hidden';
    }
  });

  $('.overlay').on('click', function (e) {
    $('.menu').toggleClass('menu_active');
    if (!$('.menu').hasClass("menu_active")) {
      // enableBodyScroll();
      document.body.style.overflow = 'auto';
    }
  })


  // scroll to
  let topOffset = 100

  $('.menu-link').each(function () {
    $(this).click(() => {
      if (window.screen.width <= 690) {
        enableBodyScroll();
        $('.menu').toggleClass('menu_active');
      }

      $(document.body).animate({
        'scrollTop': $($(this).attr('href')).offset().top - topOffset
      }, 500);
    })
  })

  $('.keto-item').each(function () {
    $(this).click(() => {
      $(document.body).animate({
        'scrollTop': $('#' + $(this).data().scroll).offset().top - topOffset
      }, 500);
    })
  })

  $('.header-arrow__button').click(() => {
    $('.keto-item__description')[0].scrollIntoView({
      block: "center",
      behavior: "smooth"
    })
  })

});