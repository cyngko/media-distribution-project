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
  }


// Use code below if preloader should only be displayed once

  // if(! sessionStorage.getItem('doNotShow')) {
  //   sessionStorage.setItem('doNotShow', true);
  //   window.onload = function () {
  //     document.querySelector('.preloader').style.opacity = '0';
  //     enableScroll();
  //   }
  // } else {
  //   document.querySelector('.preloader').style.display = 'none';
  //   enableScroll();
  // }




// Hide header while scrolling
var prevScrollpos = window.pageYOffset;

window.onscroll = function () {
  var currentScrollpos = window.pageYOffset;
  let navigation = document.getElementById('navigation');
  let navLinks = document.querySelectorAll('.menuLinks a');
  let socialIcons = document.querySelectorAll('.socials a');
  if (prevScrollpos > currentScrollpos) {
    navigation.style.top = '0';
  } else {
    navigation.style.top = '-70px';
  }
  prevScrollpos = currentScrollpos;
  if (prevScrollpos > innerHeight) {
    navigation.style.backgroundColor = 'rgba(11, 11, 11, 0.9)';
    document.querySelector('.logo a').style.color = 'white';

    navLinks.forEach((link) => {
      link.style.color = 'white';
      link.addEventListener('mouseover', () => {
        link.style.color = 'var(--highlightColor)';
      });
      link.addEventListener('mouseleave', () => {
        link.style.color = 'var(--white)';
      });
    });
    socialIcons.forEach((icon) => {
      icon.style.color = 'var(--white)';
      icon.addEventListener('mouseover', () => {
        icon.style.color = 'var(--highlightColor)';
      });
      icon.addEventListener('mouseleave', () => {
        icon.style.color = 'var(--white)';
      });
    });
    navigation.style.mixBlendMode = 'initial';
  } else {
    navigation.style.backgroundColor = '';
    // document.querySelector('.logo a').style.color = 'var(--dark)';

    navLinks.forEach((link) => {
      // link.style.color = 'var(--dark)';
      link.addEventListener('mouseover', () => {
        link.style.color = 'var(--highlightColor)';
      });
      link.addEventListener('mouseleave', () => {
        // link.style.color = 'var(--dark)';
      });
    });
    socialIcons.forEach((icon) => {
      // icon.style.color = 'var(--dark)';
      icon.addEventListener('mouseover', () => {
        icon.style.color = 'var(--highlightColor)';
      });
      icon.addEventListener('mouseleave', () => {
        // icon.style.color = 'var(--dark)';
      });
    });
  }
};

// Copyright Year
document.querySelector('#copyright-year').innerText = new Date().getFullYear();

// Custom Mouse Pointer

function customPointer() {
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
        pointerColor: 'var(--white)', // Css color
        ringSize: 12, // Pixels
        ringClickSize: 5, // Pixels when clicking
      });
    };
  }
}

customPointer();

// Get NFT Background Images
let nftImages = [...document.querySelectorAll('.nft-img')];

nftImages.forEach((img, idx) => {
  img.style.backgroundImage = `url(./images/ry/${idx + 1}_ry.png)`;
});
