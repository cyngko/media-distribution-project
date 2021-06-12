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
        ringSize: 10, // Pixels
        ringClickSize: 5, // Pixels when clicking
      });
    };
  }
}

customPointer();

// Projects Site Slider

let mainSlider = document.querySelector('.slider-main');
let innerSliderOne = document.querySelector('.slider-inner-one');
let innerSliderTwo = document.querySelector('.slider-inner-two');
let images = [...document.querySelectorAll('.slider-main svg ')];
let imageItems = [];

let current = 0;
let target = 0;
let ease = 0.075;

window.addEventListener('resize', init);

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

function init() {
  document.body.style.height = `${
    mainSlider.getBoundingClientRect().width -
    (window.innerWidth - window.innerHeight)
  }px`;
}

function transformElement(el, transform) {
  el.style.transform = transform;
}

function animate() {
  target = window.scrollY;
  current = lerp(current, target, ease).toFixed(2);
  transformElement(mainSlider, `translate3d(${-current}px, 0, 0)`);
  transformElement(innerSliderTwo, `translate3d(${-current * 1.001}px, 0, 0)`);

  for (let i = 0; i < imageItems.length; i++) {
    imageItems[i].render();
    // if (current < target - 50 || current > target + 50) {
    //   transformElement(imageItems[i].el, 'scale(0.8)');
    // } else {
    //   transformElement(imageItems[i].el, 'scale(1)');
    // }
  }

  requestAnimationFrame(animate);
}

// Intersection Observer Options

let options = {
  rootMargin: '0px',
  threshold: 0.9,
};

class ImageItem {
  constructor(el) {
    this.el = el;
    this.isVisible = false;
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => (this.isVisible = entry.isIntersecting));
    }, options);
    this.observer.observe(this.el);
    this.current = 150;
    this.target = 150;
    this.ease = 0.1;
    this.setDisplacement();
  }
  setDisplacement() {
    this.el.querySelector('feDisplacementMap').scale.baseVal = this.current;
  }

  render() {
    if (this.isVisible && this.target != 0) {
      this.target = 0;
      this.el.classList.add('active');
    }
    this.current = lerp(this.current, this.target, this.ease).toFixed(2);
    this.el.querySelector('feDisplacementMap').scale.baseVal = this.current;
  }
}

images.forEach((image) => {
  imageItems.push(new ImageItem(image));
});

init();
animate();
