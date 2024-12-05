'use strict';

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

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////

console.log(document.documentElement);
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
console.log(logo.dataset.versionNumber);
