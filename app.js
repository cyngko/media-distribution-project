// Preloader

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    'test',
    null,
    Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// disable scrolling while loading
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// enable scrolling after loading
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

disableScroll();

window.onload = function () {
  document.querySelector('.preloader').style.opacity = '0';
  enableScroll();
};

// Hide header while scrolling
var prevScrollpos = window.pageYOffset;

window.onscroll = function () {
  var currentScrollpos = window.pageYOffset;
  let navigation = document.getElementById('navigation');
  if (prevScrollpos > currentScrollpos) {
    navigation.style.top = '0';
  } else {
    navigation.style.top = '-70px';
  }
  prevScrollpos = currentScrollpos;
  if (prevScrollpos > innerHeight) {
    navigation.style.backgroundColor = 'rgba(21, 21, 21, 0.9)';
    navigation.style.mixBlendMode = 'initial';
  } else {
    navigation.style.backgroundColor = '';
  }
};

// Copyright Year
document.querySelector('#copyright-year').innerText = new Date().getFullYear();

// Custom Mouse Pointer

if (window.innerWidth > 1024) {
  let pointerJSScript = document.createElement('script');
  pointerJSScript.src = 'https://seattleowl.com/pointer.js/pointer.js';
  document.head.appendChild(pointerJSScript);

  let pointerJSStyle = document.createElement('link');
  pointerJSStyle.href = 'https://seattleowl.com/pointer.js/pointer.css';
  pointerJSStyle.rel = 'stylesheet';
  document.head.appendChild(pointerJSStyle);

  pointerJSScript.onload = () => {
    init_pointer({
      pointerColor: '#35ffa1', // Css color
      ringSize: 10, // Pixels
      ringClickSize: 10, // Pixels when clicking
    });
  };
}

// Lazy Load Images
const targets = document.querySelectorAll('.imageContainer img');

const lazyLoad = (target) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-lazy');

        img.setAttribute('src', src);
        img.classList.add('fade');

        observer.disconnect();
      }
    });
  });

  io.observe(target);
};

targets.forEach(lazyLoad);
