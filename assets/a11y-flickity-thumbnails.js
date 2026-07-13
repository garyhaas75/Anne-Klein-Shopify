/**
 * Accessibility fix for Flickity-powered product gallery thumbnails.
 *
 * Flickity toggles aria-hidden="true" on off-screen/inactive slides but does
 * not manage tabindex, leaving hidden slides reachable via keyboard while
 * being invisible to assistive tech (WCAG 4.1.2 - aria-hidden-focus).
 *
 * This keeps tabindex in sync with aria-hidden on:
 *   - .product-gallery__thumbnail elements inside .product-gallery__thumbnails
 *   - any other Flickity-managed slide/cell carrying aria-hidden
 *
 * Runs on init, on Flickity's 'select' event, and periodically observes
 * attribute mutations Flickity makes directly (in case 'select' timing
 * misses a cell), via a MutationObserver as a safety net.
 */
(function () {
  function syncTabindex(el) {
    if (!el) return;
    var hidden = el.getAttribute('aria-hidden') === 'true';
    if (hidden) {
      el.setAttribute('tabindex', '-1');
    } else {
      el.setAttribute('tabindex', '0');
    }
  }

  function syncAllThumbnails(container) {
    var thumbnails = container.querySelectorAll('.product-gallery__thumbnail');
    for (var i = 0; i < thumbnails.length; i++) {
      syncTabindex(thumbnails[i]);
    }
  }

  function initContainer(container) {
    if (!container || container.getAttribute('data-a11y-flickity-bound') === 'true') {
      return;
    }
    container.setAttribute('data-a11y-flickity-bound', 'true');

    // Initial sync in case slides already have aria-hidden set on render/first paint
    syncAllThumbnails(container);

    // If jQuery + Flickity's jQuery bridge is available, hook into the 'select' event
    if (window.jQuery) {
      window.jQuery(container).on('select.flickity', function () {
        syncAllThumbnails(container);
      });
    }

    // Safety net: watch for aria-hidden attribute mutations Flickity applies directly to slides
    if (window.MutationObserver) {
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') {
            syncTabindex(mutation.target);
          }
        });
      });

      observer.observe(container, {
        attributes: true,
        attributeFilter: ['aria-hidden'],
        subtree: true
      });
    }
  }

  function initAll() {
    var containers = document.querySelectorAll('.product-gallery__thumbnails');
    for (var i = 0; i < containers.length; i++) {
      initContainer(containers[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Re-scan after Shopify section reloads (theme editor) in case new galleries are injected
  document.addEventListener('shopify:section:load', initAll);
})();
