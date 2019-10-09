var jquery = require("jquery");
const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;
import aos from 'aos'

window.$ = window.jQuery = jquery;
import 'babel-polyfill';

$(document).ready(() => {



  const menu = $('.menu')[0]
  const getMenuHeight = () => {
    return menu.offsetHeight + 5
  }

  let menuHeight = getMenuHeight()
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


  window.addEventListener('scroll', scrollHandler)

  window.addEventListener("resize", () => {
    menuHeight = getMenuHeight()
  })

  // menu
  const overlay = $('.overlay')[0]


  $('.menu-btn').on('click', function (e) {
    e.preventDefault();

    $('body').toggleClass('menu-open');
    if ($('body').hasClass("menu-open")) {
      disableBodyScroll(overlay);
    }
  });

  $('.overlay').on('click', function (e) {
    $('body').toggleClass('menu-open');
    if (!$('body').hasClass("menu-open")) {
      enableBodyScroll(overlay);
    }
  })


  // scroll to
  let topOffset = 100

  $('.menu-link').each(function () {
    $(this).click(() => {
      if (window.screen.width <= 690) {
        enableBodyScroll(overlay);
        $('body').toggleClass('menu-open');
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

  $('.header-arrow__button').click(function () {
    $(document.body).animate({
      'scrollTop': $('#' + $(this).data().scroll).offset().top - topOffset
    }, 500);
  })

  aos.init({
    offset: 200,
    duration: 600,
    easing: "ease-in",
    delay: 100,
    disable: "mobile"
  })
});