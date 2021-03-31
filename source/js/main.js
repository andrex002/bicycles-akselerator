'use strict';

(function() {
  document.addEventListener("DOMContentLoaded", function() {
    const pageHeader = document.querySelector('.page-header');
    const burgerBtn = pageHeader.querySelector('.burger-btn');
    const mainNavLinks = pageHeader.querySelectorAll('.main-nav a');
    const videoPlayBtn = document.querySelector('.video__play-btn');
    let closedMenu = true;

    const togglesMenuState = function() {
      if(window.innerWidth < 768) {
        document.body.style.overflow = closedMenu ? 'hidden' : '';
        closedMenu = !closedMenu;
      }
      pageHeader.classList.toggle('page-header--opened');
    };

    pageHeader.classList.remove('page-header--no-js');

    burgerBtn.addEventListener('click', function() {
      togglesMenuState();
    });

    for(let i = 0; i < mainNavLinks.length; i++) {
      mainNavLinks[i].addEventListener('click', function () {
        if(window.innerWidth < 1024) {
          togglesMenuState();
        }
      });
    }

    const onPlayBtnClick = function() {
      const parent = this.parentElement;
      const preview = parent.querySelector('img[data-video]')
      const videoLink = preview.dataset.video;
      let videoFile = '<iframe class="video__file" autoplay="1"  src="https://www.youtube.com/embed/' + videoLink +'?rel=0&showinfo=0&autoplay=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      parent.classList.add('video-block--play');
      parent.innerHTML = videoFile;
    };

    if(videoPlayBtn) {
      videoPlayBtn.addEventListener('click', onPlayBtnClick);
    }

    // Маска на поле телефона
    [].forEach.call(document.querySelectorAll('input[type=tel]'), function (input) {
      var keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ __ __",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a
          });
        i = new_value.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function (a) {
            return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5) this.value = ""
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false)

    });
  });
})();
