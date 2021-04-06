'use strict';

(function () {
  document.addEventListener(`DOMContentLoaded`, function () {

    const pageHeader = document.querySelector(`.page-header`);
    const burgerBtn = pageHeader.querySelector(`.burger-btn`);
    const mainNavLinks = pageHeader.querySelectorAll(`.main-nav a`);
    const videoPlayBtn = document.querySelector(`.video__play-btn`);
    let closedMenu = true;

    const togglesMenuState = function () {
      if (window.innerWidth < 768) {
        document.body.style.overflow = closedMenu ? `hidden` : ``;
        closedMenu = !closedMenu;
      }
      pageHeader.classList.toggle(`page-header--opened`);
    };

    pageHeader.classList.remove(`page-header--no-js`);

    burgerBtn.addEventListener(`click`, function () {
      togglesMenuState();
    });

    for (let i = 0; i < mainNavLinks.length; i++) {
      mainNavLinks[i].addEventListener(`click`, function () {
        if (window.innerWidth < 1024) {
          togglesMenuState();
        }
      });
    }

    const onPlayBtnClick = function () {
      const parent = videoPlayBtn.parentElement;
      const preview = parent.querySelector(`img[data-video]`);
      const videoLink = preview.dataset.video;
      let videoFile = `<iframe class="video__file" autoplay="1"  src="https://www.youtube.com/embed/${videoLink}?rel=0&showinfo=0&autoplay=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      parent.classList.add(`video-block--play`);
      parent.innerHTML = videoFile;
    };

    if (videoPlayBtn) {
      videoPlayBtn.addEventListener(`click`, onPlayBtnClick);
    }

    // Маска на поле телефона
    [].forEach.call(document.querySelectorAll(`input[type=tel]`), function (input) {
      let keyCode;
      const mask = function (evt) {
        if (evt.keyCode) {
          keyCode = evt.keyCode;
        }
        let pos = input.selectionStart;
        if (pos < 3) {
          evt.preventDefault();
        }
        const matrix = `+7 (___) ___ __ __`;
        let i = 0;
        const def = matrix.replace(/\D/g, ``);
        let val = input.value.replace(/\D/g, ``);
        let newValue = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
        i = newValue.indexOf(`_`);
        if (i !== -1) {
          if (i < 5) {
            i = 3;
          }
          newValue = newValue.slice(0, i);
        }
        let reg = matrix.substr(0, input.value.length).replace(/_+/g,
            function (a) {
              return `\\d{1,` + a.length + `}`;
            }).replace(/[+()]/g, `\\$&`);
        reg = new RegExp(`^` + reg + `$`);
        if (!reg.test(input.value) || input.value.length < 5 || keyCode > 47 && keyCode < 58) {
          input.value = newValue;
        }
        if (evt.type === `blur` && input.value.length < 5) {
          input.value = ``;
        }
      };

      input.addEventListener(`input`, mask, false);
      input.addEventListener(`focus`, mask, false);
      input.addEventListener(`blur`, mask, false);
      input.addEventListener(`keydown`, mask, false);

    });
  });
})();
