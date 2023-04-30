'use strict';

const headerLogo = document.querySelector('.header__logo_box');
const goToTop = document.querySelector('.up__arr');
const headerLists = document.querySelector('.header__lists');
const headergGreet = document.querySelectorAll('.header__greets');
const sectionNode = document.querySelectorAll('.section');
const skillGraph = document.querySelectorAll('.skill__graph');
const headerNav = document.querySelector('.header__nav');
const eduBtn = document.querySelectorAll('.education__btn');
const eduContent = document.querySelectorAll('.education__content');
const inputBox = document.querySelector('.contact__textarea');
const submitBtn = document.querySelector('.contact__submit');
const header = document.querySelector('.header');
const certificateTitle = document.querySelectorAll('.certificate__title');
const certificateImg = document.querySelector('.certificate__img');

const [...section] = sectionNode;

// !Custom alert
class AddHTML {
  constructor(t, message) {
    this._alertContent(t, message);
    new AlertBox();
  }

  _alertContent(t, message) {
    const type = t === 'SUCCESS' ? 'success' : 'error';
    const html = `
        <div class="alert ${type}">
          <p class="alert__text">${message}</p>
          <span class="alert__close_btn">&times;</span>
        </div>
        `;

    document.body.insertAdjacentHTML('afterbegin', html);
  }
}

class AlertBox {
  #closeBtn = document.querySelector('.alert__close_btn');
  constructor() {
    this.#closeBtn.addEventListener('click', this._closebtn);
    setTimeout(() => {
      this._closebtn();
    }, 3000);
  }
  _closebtn() {
    const box = document.querySelector('.alert');
    box.remove();
  }
}

// ! Navigation Hover efficts////////////////////////////////////////////////////////////////
const heandalLinks = function (e) {
  e.preventDefault();
  if (e.target.classList.contains('header__link')) {
    const link = e.target;
    const siblings = link
      .closest('.header__lists')
      .querySelectorAll('.header__link');
    siblings.forEach((l) => {
      if (l !== link) {
        l.style.opacity = this;
      }
    });
  }
};

headerLists.addEventListener('mouseover', heandalLinks.bind(0.4));
headerLists.addEventListener('mouseout', heandalLinks.bind(1));

// ! Section disclose////////////////////////////////////////////////////////////////
const reveal = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.style.transition = 'all .8s';
  entry.target.classList.remove('section__hidden');
};

const sectionReveal = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0.3,
});

section.forEach((e) => {
  sectionReveal.observe(e);
  e.classList.add('section__hidden');
});

//! Navigation go off in footer**************************************************************

const navigationGoOff = function (entries) {
  const [entery] = entries;
  if (entery.isIntersecting) {
    headerNav.style.position = 'relative';
  } else {
    headerNav.style.position = 'fixed';
  }
};

const navOnFooter = new IntersectionObserver(navigationGoOff, {
  root: null,
  threshold: 0.2,
});

navOnFooter.observe(section.at(-1));

//! NAVIGATIONS SHOWING////////////////////////////////////////////////////////////////
const navHeight = headerNav.getBoundingClientRect().height;
const headerFun = function (entries) {
  let [entery] = entries;
  if (!entery.isIntersecting) {
    // NAVBAR
    headerNav.style.position = 'fixed';
    // headerNav.style.top = "2rem";
    // headerNav.style.left = "2rem";
    headerNav.style.width = '100%';
    headerNav.style.zIndex = '2';

    // GO TO TOP
  } else {
    headerNav.style.position = 'relative';
  }
};

const headerObserver = new IntersectionObserver(headerFun, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//! REVEAL EDUCATION////////////////////////////////////////////////////////////////
let btnCount = 0;
eduContent[0].classList.remove('u__reveal_not');
eduBtn[0].setAttribute('name', 'remove-outline');
eduBtn.forEach((btn, i) => {
  btn.addEventListener('click', function (e) {
    // Hide all other content
    eduContent.forEach((e) => e.classList.add('u__reveal_not'));

    // Menipulate all other btns
    eduBtn.forEach((b) => b.setAttribute('name', 'add-outline'));

    // Menipulate Btn
    e.target.setAttribute('name', 'remove-outline');

    // Reveal content
    const targetParent = e.target.closest('.education__detail');
    targetParent.children[1].classList.remove('u__reveal_not');
  });
});

//! Certificate carousel////////////////////////////////////////////////////////////////
certificateTitle.forEach((el) => {
  el.addEventListener('click', function (e) {
    certificateTitle.forEach((el) => el.classList.remove('selected'));
    e.target.classList.add('selected');
    certificateImg.src = `img/cert-${e.target.dataset.num}.png`;
  });
});
//! Input validation////////////////////////////////////////////////////////////////

let inputCount = 0;

submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(inputBox.value.length);
  if (inputBox.value.length === 0)
    return new AddHTML('ERROR', 'Plese enter your message');
  return new AddHTML('SUCCESS', 'Thank you for your words');
});
// new AddHTML('ERROR', 'Plese fill form properly');
