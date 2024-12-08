'use strict';

const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('header');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScroll.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Page navigation

/* document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
}); */
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //guard clause
  if (!clicked) return;

  //remove active classes
  tabs.forEach(t => t.classList.remove('.operations__tab--active'));
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));

  //activate tab
  clicked.classList.add('operations__tab--active');

  //activate content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu fade animation
const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = '0.5';
    });
    logo.style.opacity = '0.5';
  }
});
nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = '1';
    });
    logo.style.opacity = '1';
  }
});

//Sticky navigation, this way is pretty bad for performance

/* const initialCords = section1.getBoundingClientRect();

window.addEventListener('scroll', function () {
  if (this.scrollY > initialCords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}); */

//A better way: The intersection observer api

/* const callback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};

const options = {
  root: null,
  threshold: 0.1,
};

const observer = new IntersectionObserver(callback, options);
observer.observe(section1); */

const headerr = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  rootMargin: `${-navHeight}px`,
  threshold: 0,
});
headerObserver.observe(headerr);

//REVEALING ELEMENTS ON SCROLL - REVEAL SECTIONS

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  /*  section.classList.add('section--hidden'); */
});

// LAZY LOADING IMAGES

const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loading = function (entries, observe) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  //REPLACE SRC WITH DATA-SRC
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => {
  imgObserver.observe(img);
});

//SLIDER

const slides = document.querySelectorAll('.slide');
/* const slider = document.querySelector('.slider'); */
let curSlide = 0;
const maxSlide = slides.length;
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
/* slider.style.transform = 'scale(0.5) translateX(-800px)';
slider.style.overflow = 'visible'; */

const goToSLide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  );
};
goToSLide(0);
// Next slide

const nextSLide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSLide(curSlide);
};

const prevSLide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSLide(curSlide);
};

btnRight.addEventListener('click', nextSLide);
btnLeft.addEventListener('click', prevSLide);

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////

/* console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
console.log(document.querySelector('html'));
const allSections = document.querySelectorAll('.section');
console.log(allSections);

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analitycs. <button class="btn btn--close-cookie">Got it</button>';

header.append(message);

//Delete elements
const btnGotIt = document.querySelector('.btn--close-cookie');
btnGotIt.addEventListener('click', function (e) {
  e.preventDefault();
  message.remove();
});

//styles

message.style.backgroundColor = 'blue';
message.style.width = '120% ';

console.log(getComputedStyle(message).backgroundColor);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
console.log(getComputedStyle(message).height);

document.documentElement.style.setProperty('--color-primary', 'red');

//attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.classList);
console.log(logo.getAttribute('designer'));

logo.alt = 'Beautiful minimalist logo';
console.log(logo.setAttribute('alt', 'Not to bad logo is this'));
console.log(logo.getAttribute('alt'));
logo.setAttribute('company', 'Bankist');

const link = document.querySelector('.nav__link--btn');

console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber); */

/* const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1'); */
/* btnScroll.addEventListener('click', function (e) { */
/*   const s1cords = section1.getBoundingClientRect();
  console.log(s1cords);

  console.log(e.target.getBoundingClientRect());

  console.log(`Currrent scrol (x/y)`, pageXOffset, pageYOffset);

  console.log(
    'Height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  ); */
//top- position from the top of the viewport
/* window.scrollTo(
    s1cords.left + window.pageXOffset,
    s1cords.top + window.pageYOffset
  ); */

/*   window.scrollTo({
    left: s1cords.left + window.pageXOffset,
    top: s1cords.top + window.pageYOffset,
    behavior: 'smooth',
  }); */

/*   section1.scrollIntoView({ behavior: 'smooth' });
}); */

/* const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('addEventListener:Great! You are reading the heading');
  setTimeout(() => {
    h1.removeEventListener('mouseenter', alertH1);
  }, 3000);
};
h1.addEventListener('mouseenter', alertH1);

function myFunction() {
  document.querySelector('h1').style.color = 'red';
} */

/* const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('LINK', e.target);
  },
  true
);
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target);
});
document.querySelector('.nav ').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target);
});
 */

/* const h1 = document.querySelector('h1');
// Going downwards:child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'red';

//Going upwards: parenta
console.log(h1.parentElement);
h1.closest('.header').style.background = 'var(--gradient-secondary)';

//Going sideways: siblings
console.log(h1.previousSibling);
console.log(h1.nextElementSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(el =>
  el !== h1 ? (el.style.transform = scale(0.5)) : ''
);
 */
