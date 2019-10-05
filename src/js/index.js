var jquery = require("jquery");
window.$ = window.jQuery = jquery;
import 'babel-polyfill';

$(document).ready(() => {
  const menu = $('.menu-nav')[0]
  const menuHeight = menu.offsetHeight

  let lastPageYOffset = pageYOffset
  let transform = 0

  window.addEventListener('scroll', (evt) => {
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
  })

  // menu
  $('.menu-btn').on('click', function (e) {
    e.preventDefault();
    $('.main-menu').toggleClass('menu_active');
    // document.body.style.overflow = 'hidden';


  });
});





//  document.onclick = function () {
//    let container = $('.main-menu');
//    container.removeClass('menu_active');
//  }