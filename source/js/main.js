'use strict';

document.addEventListener("DOMContentLoaded", function() {
  const pageHeaderElement = document.querySelector('.page-header');
  const pageMainElement = document.querySelector('.main');
  const pageFooterElement = document.querySelector('.page-footer');
  const popupInputs = document.querySelectorAll('.popup__input');
  
  let width = window.innerWidth || document.body.clientWidth;

  // Переключение табов - start
  const switchesTabs = function(selectorBlock) {
    const tabsNav = pageMainElement.querySelectorAll(selectorBlock + ' .menu-tabs__item');
    const tabsContent = pageMainElement.querySelectorAll(selectorBlock + ' .catalog__tab-content');
    let tabName;

    const selectTabContent = function(tabName) {
      for(let i = 0; i < tabsContent.length; i++) {
        if(tabsContent[i].classList.contains(tabName)) {
          tabsContent[i].classList.add('catalog__tab-content--active');
        } else {
          tabsContent[i].classList.remove('catalog__tab-content--active');
        }
      }
    };

    const onTabNavClick = function(evt) {
      evt.preventDefault();
      for(let i = 0; i < tabsNav.length; i++) {
        tabsNav[i].classList.remove('menu-tabs__item--active');
      }
      this.classList.add('menu-tabs__item--active');
      tabName = this.getAttribute('data-tab-name');
      selectTabContent(tabName);
    };

    for(let i = 0; i < tabsNav.length; i++) {
      tabsNav[i].addEventListener('click', onTabNavClick);
    }
  };

  switchesTabs('.catalog');
  // Переключение табов - end

  
  for(let i = 0; i < popupInputs.length; i++) {
    popupInputs[i].addEventListener('input', function() {
      if(popupInputs[i].value !== '') {
        popupInputs[i].classList.add('label-hide');
      } else {
        popupInputs[i].classList.remove('label-hide');
      }
    });
  }

  //  Открывает модальное окно
  const openPopup = function (evt, popup) {
    const closeBtn = popup.querySelector('.popup__close-btn');
    evt.preventDefault();
    popup.classList.add('popup--show');
    popup.addEventListener('click', onOverlayClick);
    if (closeBtn) {
      closeBtn.addEventListener('click', onBtnCloseClick);
    }
  }

  //  Закрывает модальное окно
  const closePopup = function () {
    const popup = document.body.querySelector('.popup--show');
    const closeBtn = popup.querySelector('.popup__close-btn');
    popup.classList.remove('popup--show');
    popup.removeEventListener('click', onOverlayClick);
    if (closeBtn) {
      closeBtn.removeEventListener('click', onBtnCloseClick);
    }
  };

  //  Закрывает модальное окно по клику на крестик
  const onBtnCloseClick = function () {
    closePopup();
  };

  //  Закрывает модальное окно по клику на overlay
  const onOverlayClick = function (evt) {
    const popup = document.body.querySelector('.popup--show');
    if (evt.target === popup) {
      closePopup();
    }
  };



  const contactsBtn = pageFooterElement.querySelector('.contacts__btn');

  contactsBtn.addEventListener('click', function (evt) {
    const popupElement = document.querySelector('.popup');
    openPopup(evt, popupElement);
  });
  
  if(width <= 767) {
    const burgerBtn = pageHeaderElement.querySelector('.burger-btn');

    burgerBtn.addEventListener('click', function (evt) {
      const popupElement = pageHeaderElement.querySelector('.main-nav');
      openPopup(evt, popupElement);
    });
  }
});
