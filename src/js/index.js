import myFonts from './fontawesome';

let docBody = document.body;
let docEl = document.documentElement;
let moreProjects = document.querySelector('#more-projects');
let firstItem = document.querySelector('#about');

// Open Menu (Add .active to body)
const menuOpen = () => docBody.classList.add('active');
document.querySelector('#mobile-menu-open').onclick = () => menuOpen();

// Close Menu (Removes .active from body)
const menuClose = () => docBody.classList.remove('active');
document.querySelector('#mobile-menu-close').onclick = () => menuClose();

// Expand more projects container
function viewMore(e) {
  e.preventDefault();
  this.parentNode.removeChild(this);
  fadeIn(moreProjects);
}
document.querySelector('#view-more-projects').addEventListener('click', viewMore);

// Scroll to top
document.querySelector('#to-top').onclick = () => scrollTo(docEl, 0, 500);

// Scroll to First section
document.querySelector('#lead-down').onclick = () => {
  let itemTop = firstItem.offsetTop;
  scrollTo(docEl, itemTop, 500);
}

// Scroll to section when menu item is clicked and close the menu if on mobile
let menuLinks = document.querySelectorAll('header a');
for (let link of menuLinks) {
  link.addEventListener('click', (e) => {
    if (e.target.getAttribute('download')){
      menuClose();
      return;
    }
    e.preventDefault();
    let el = link.getAttribute('href');
    let loc = document.querySelector(el).offsetTop;
    scrollTo(docEl, loc, 500);
    menuClose();
  })
}





// Fade in
const fadeIn = (el, display) => {
  el.style.opacity = 0;
  el.style.display = display || 'block';

  (function fade() {
    let val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

// Scroll to
const scrollTo = (element, to, duration) => {
  let start = element.scrollTop,
    change = to - start,
    currentTime = 0,
    increment = 20;

  let animateScroll = () => {
    currentTime += increment;
    let val = Math.easeInOutQuad(currentTime, start, change, duration);
    element.scrollTop = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
}

// Ease function
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};
