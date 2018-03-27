import myFonts from './fontawesome';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

let docBody = document.body,
    docEl = document.documentElement,
    moreProjects = document.querySelector('#more-projects'),
    toTopButton = document.querySelector('#to-top'),
    leadDownButton = document.querySelector('#lead-down'),
    pageHeader = document.querySelector('#lead'),
    aboutSection = document.querySelector('#about'),
    menuOpenButton = document.querySelector('#mobile-menu-open'),
    menuCloseButton = document.querySelector('#mobile-menu-close'),
    viewMoreButton = document.querySelector('#view-more-projects');

// Open Menu (Add .active to body)
menuOpenButton.onclick = () => menuOpen();
const menuOpen = () => docBody.classList.add('active');

// Close Menu (Removes .active from body)
menuCloseButton.onclick = () => menuClose();
const menuClose = () => docBody.classList.remove('active');

// Expand more projects container
viewMoreButton.addEventListener('click', viewMore);
function viewMore(e) {
  e.preventDefault();
  this.parentNode.removeChild(this);
  fadeIn(moreProjects);
}

// Scroll to Top
toTopButton.onclick = () => {
  pageHeader.scrollIntoView({
    behavior: 'smooth'
  })
}

// Scroll to First Section
leadDownButton.onclick = () => {
  aboutSection.scrollIntoView({
    behavior: 'smooth'
  })
}

// Scroll to section when menu item is clicked and close the menu if on mobile
let menuLinks = document.querySelectorAll('header a');
for (let link of menuLinks) {
  link.addEventListener('click', (e) => {
    if (e.target.getAttribute('download')) {
      menuClose();
      return;
    }
    e.preventDefault();
    let el = link.getAttribute('href');
    let loc = document.querySelector(el);
    loc.scrollIntoView({
      behavior: 'smooth'
    });
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
