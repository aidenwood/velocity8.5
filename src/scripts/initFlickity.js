/**
 * Initialize Flickity carousels with robust error handling,
 * duplicate-init protection, and post-init height correction.
 *
 * Flickity is loaded globally via <script src="unpkg..."> in the Layout,
 * so we reference window.Flickity rather than importing an ES module.
 *
 * @param {string} selector - CSS selector of the target carousel element(s)
 * @param {Object} options  - Flickity options per component
 */
export function initFlickity(selector, options = {}) {
  const elems = document.querySelectorAll(selector);

  elems.forEach((elem) => {
    // Skip if already initialized (either by us or by data-flickity attr)
    if (elem.flickityInstance || elem.classList.contains('flickity-enabled')) {
      return;
    }

    // Flickity must be available globally
    if (typeof window.Flickity === 'undefined') {
      console.warn('[initFlickity] Flickity not loaded yet for', selector);
      return;
    }

    try {
      const flkty = new window.Flickity(elem, options);
      elem.flickityInstance = flkty;

      // Force a resize after images load to correct adaptive height
      if (options.imagesLoaded) {
        const images = elem.querySelectorAll('img');
        let loaded = 0;
        const total = images.length;

        if (total === 0) {
          flkty.resize();
        } else {
          images.forEach((img) => {
            if (img.complete) {
              loaded++;
              if (loaded === total) flkty.resize();
            } else {
              img.addEventListener('load', () => {
                loaded++;
                if (loaded === total) flkty.resize();
              }, { once: true });
              img.addEventListener('error', () => {
                loaded++;
                if (loaded === total) flkty.resize();
              }, { once: true });
            }
          });
        }
      }

      // Remove the pre-init min-height class once Flickity has taken over
      elem.classList.add('flickity-ready');
    } catch (err) {
      console.error('[initFlickity] Failed to init', selector, err);
    }
  });
}

/**
 * Initialize all carousels used across the site.
 * Called on DOMContentLoaded and astro:after-swap.
 */
export function initAllCarousels() {
  initFlickity('.fullscreen-carousel', {
    cellAlign: 'left',
    contain: true,
    prevNextButtons: false,
    imagesLoaded: true,
    adaptiveHeight: true,
    groupCells: '85%',
    pageDots: false,
    autoPlay: 3200,
    wrapAround: true,
  });

  initFlickity('.web-carousel', {
    cellAlign: 'left',
    contain: true,
    prevNextButtons: false,
    imagesLoaded: true,
    adaptiveHeight: true,
    groupCells: '85%',
    pageDots: false,
    autoPlay: 2400,
    wrapAround: true,
  });

  initFlickity('.market-carousel', {
    cellAlign: 'left',
    contain: true,
    prevNextButtons: false,
    imagesLoaded: true,
    adaptiveHeight: true,
    groupCells: '85%',
    pageDots: false,
    autoPlay: 2400,
    wrapAround: true,
  });
}
