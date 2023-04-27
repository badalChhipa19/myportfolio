"use strict";

const headerLogo = document.querySelector(".header__logo_box");
const goToTop = document.querySelector(".up__arr");
const headerLists = document.querySelector(".header__lists");
const headergGreet = document.querySelectorAll(".header__greets");
const sectionNode = document.querySelectorAll(".section");
const skillGraph = document.querySelectorAll(".skill__graph");
const headerNav = document.querySelector(".header__nav");
const eduBtn = document.querySelectorAll(".education__btn");
const eduContent = document.querySelectorAll(".education__content");
const certificateImg = document.querySelectorAll(".certificate__img");
const certificateContent = document.querySelectorAll(".certificate__content");
const inputBox = document.querySelectorAll(".contact__input_box");
const submitBtn = document.querySelector(".contact__submit");
const header = document.querySelector(".header");

const [...section] = sectionNode;

// !Starting loading
// const rightNav = document.querySelector(".social__right");
// const leftNav = document.querySelector(".social__left");

// header.style.opacity = 0;

// leftNav.style.bottom = rightNav.style.bottom = "-100%";

// const intervalStartBottom = function (time, element) {
//   const interval = setInterval(function () {
//     element.style.opacity = 1;
//     element.style.bottom = 0;
//     clearInterval(interval);
//   }, time);
// };
// intervalStartBottom(3000, goToTop);
// intervalStartBottom(3000, leftNav);
// intervalStartBottom(3000, rightNav);
// intervalStartBottom(1000, header);

// ! Navigation Hover efficts////////////////////////////////////////////////////////////////
const heandalLinks = function (e) {
  e.preventDefault();
  if (e.target.classList.contains("header__link")) {
    const link = e.target;
    const siblings = link
      .closest(".header__lists")
      .querySelectorAll(".header__link");
    siblings.forEach((l) => {
      if (l !== link) {
        l.style.opacity = this;
      }
    });
  }
};

headerLists.addEventListener("mouseover", heandalLinks.bind(0.4));
headerLists.addEventListener("mouseout", heandalLinks.bind(1));

// ! Section disclose////////////////////////////////////////////////////////////////
const reveal = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.style.transition = "all .8s";
  entry.target.classList.remove("section__hidden");
};

const sectionReveal = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0.3,
});

section.forEach((e) => {
  sectionReveal.observe(e);
  e.classList.add("section__hidden");
});

//! Navigation go off in footer**************************************************************

const navigationGoOff = function (entries) {
  const [entery] = entries;
  if (entery.isIntersecting) {
    headerNav.style.position = "relative";
  } else {
    headerNav.style.position = "fixed";
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
    headerNav.style.position = "fixed";
    // headerNav.style.top = "2rem";
    // headerNav.style.left = "2rem";
    headerNav.style.width = "100%";
    headerNav.style.zIndex = "2";

    // GO TO TOP
    goToTop.style.transition = "all .3s";
    goToTop.style.bottom = "40%";
    goToTop.style.zIndex = 2;
  } else {
    headerNav.style.position = "relative";
    goToTop.style.right = "5.7%";
    goToTop.style.bottom = "0%";
    goToTop.style.zIndex = -1;
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
eduContent[0].classList.remove("u__reveal_not");
eduBtn[0].setAttribute("name", "remove-outline");
eduBtn.forEach((btn, i) => {
  btn.addEventListener("click", function (e) {
    // Hide all other content
    eduContent.forEach((e) => e.classList.add("u__reveal_not"));

    // Menipulate all other btns
    eduBtn.forEach((b) => b.setAttribute("name", "add-outline"));

    // Menipulate Btn
    e.target.setAttribute("name", "remove-outline");

    // Reveal content
    const targetParent = e.target.closest(".education__detail");
    targetParent.children[1].classList.remove("u__reveal_not");
  });
});

//! Certificate carousel////////////////////////////////////////////////////////////////

let carousel;

const carouselFun = function () {
  let imgCount = 0;
  let carouselLength = certificateImg.length;
  carousel = setInterval(() => {
    if (imgCount < carouselLength - 1) {
      certificateImg.forEach((img) => {
        img.style.transition = "all .8s";
        img.style.transform = `translateX(-${120 * (imgCount + 1)}%)`;
      });

      imgCount++;
    } else {
      imgCount = 0;
      certificateImg.forEach((i) => {
        i.style.transition = "all 0s";
        i.style.transform = "translateX(0%)";
      });
    }
  }, 3000);
};
carouselFun();

//* Hover condition on certificate
certificateContent.forEach((content, index) => {
  // MOUSE OVER CERTIFICATE
  content.addEventListener("mouseover", (e) => {
    // 1. stop carousel
    clearInterval(carousel);

    // 2.go to first column
    certificateImg.forEach((i) => {
      i.style.transform = `translateX(-${120 * index}%)`;
    });

    // 3. show current certificate
    certificateImg[index].style.gridRow = "1 / 2";
  });

  // MOUSE OUT CONSITION

  content.addEventListener("mouseout", (e) => {
    carouselFun();
  });
});

//! Input validation////////////////////////////////////////////////////////////////

let inputCount = 0;

submitBtn.addEventListener("click", function () {
  inputBox.forEach((input) => {
    input.value.length < 3 || alert("Enter valid Details");
  });
});
