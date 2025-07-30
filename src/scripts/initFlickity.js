import Flickity from 'https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js';

/**
 * Initialize a Flickity carousel
 * @param {string} selector - CSS selector of the target element
 * @param {Object} options - Flickity options per component
 */
export function initFlickity(selector, options = {}) {
  const elems = document.querySelectorAll(selector);
  elems.forEach((elem) => {
    if (!elem.flickityInstance) {
      elem.flickityInstance = new Flickity(elem, options);
    }
  });
}