/**
 * NEW GOLDEN ENTERPRISES — PRODUCT DETAIL & 3D STUDIO CONTROLLER
 * Controls the dedicated product experience page:
 * - Dynamically loads product data, specs, features, and authentic photography
 * - Initializes dedicated Three.js 3D model for the selected product
 * - Handles real-time finish and glass customization
 * - Connects quote form and quick switcher to all other 8 systems
 */

import { PRODUCTS_DATA, FINISHES_DATA, GLASS_DATA } from './products-data.js';
import { init3DStudio } from './three-scene.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Determine active product from URL query param
  const urlParams = new URLSearchParams(window.location.search);
  const activeId = urlParams.get('id') || 'casement-windows';
  
  const product = PRODUCTS_DATA.find(p => p.id === activeId) || PRODUCTS_DATA[0];

  // 2. Populate Page Content & Metadata
  populateProductData(product);

  // 3. Initialize 3D Architectural Studio
  let visualizer = null;
  try {
    visualizer = init3DStudio('product-canvas-container');
    if (visualizer) {
      visualizer.buildModel(product.modelMapping);
      initStudioCustomizer(visualizer, product);
    }
  } catch (err) {
    console.error('Error initializing 3D Studio:', err);
  }

  // 4. Render Related / Other 8 Systems Grid
  renderOtherSystems(product.id);

  // 5. Initialize Navigation & Quote Form
  initHeader();
  initQuoteForm(product);
  initScrollAnimations();
});

/**
 * Populates DOM elements with selected product details
 */
function populateProductData(product) {
  // Update document title
  document.title = `${product.title} — 3D Studio | NEW GOLDEN ENTERPRISES`;

  // Breadcrumb
  const breadcrumbEl = document.getElementById('product-breadcrumb-name');
  if (breadcrumbEl) breadcrumbEl.textContent = product.title;

  // Series tag & category
  const seriesTagEl = document.getElementById('product-series-tag');
  if (seriesTagEl) seriesTagEl.textContent = product.seriesTag;

  // Titles
  const titleEl = document.getElementById('product-title');
  if (titleEl) titleEl.textContent = product.title;

  const headlineEl = document.getElementById('product-hero-headline');
  if (headlineEl) headlineEl.textContent = product.heroHeadline;

  const descEl = document.getElementById('product-long-desc');
  if (descEl) descEl.textContent = product.longDesc;

  // Price Estimate
  const priceValEl = document.getElementById('product-price-val');
  if (priceValEl && product.priceEstimate) {
    priceValEl.textContent = product.priceEstimate;
  }

  // Sidebar Quick Specs (compact table beside 3D viewer)
  const sidebarSpecsEl = document.getElementById('sidebar-quick-specs');
  if (sidebarSpecsEl && product.specs) {
    let sHtml = '<div class="sidebar-specs-list">';
    const keySpecEntries = Object.entries(product.specs).slice(0, 4);
    keySpecEntries.forEach(([label, val]) => {
      sHtml += `
        <div class="sidebar-spec-row">
          <span class="sidebar-spec-label">${label}</span>
          <span class="sidebar-spec-val">${val}</span>
        </div>
      `;
    });
    sHtml += '</div>';
    sidebarSpecsEl.innerHTML = sHtml;
  }

  // Authentic Image
  const realImgEl = document.getElementById('product-real-img');
  if (realImgEl) {
    realImgEl.src = product.image;
    realImgEl.alt = `${product.title} Authentic Architecture`;
    realImgEl.onerror = () => {
      realImgEl.onerror = null;
      realImgEl.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
    };
  }

  // Specifications Grid
  const specsGrid = document.getElementById('product-specs-grid');
  if (specsGrid && product.specs) {
    let html = '';
    for (const [label, val] of Object.entries(product.specs)) {
      html += `
        <div class="product-spec-card">
          <span class="product-spec-label">${label}</span>
          <span class="product-spec-val">${val}</span>
        </div>
      `;
    }
    specsGrid.innerHTML = html;
  }

  // Engineering Features List
  const featuresList = document.getElementById('product-features-list');
  if (featuresList && product.features) {
    let fHtml = '';
    product.features.forEach(feat => {
      fHtml += `
        <li class="product-feature-bullet">
          <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>${feat}</span>
        </li>
      `;
    });
    featuresList.innerHTML = fHtml;
  }

  // Sash Action Button text
  const sashBtnText = document.getElementById('sash-action-text');
  if (sashBtnText && product.sashActionLabel) {
    sashBtnText.textContent = product.sashActionLabel;
  }
}

/**
 * Binds 3D customizer controls (swatches, glass, sash)
 */
function initStudioCustomizer(visualizer, product) {
  // Finish Swatches
  const swatches = document.querySelectorAll('.swatch-btn');
  const activeFinishLabel = document.getElementById('active-finish-label');

  swatches.forEach(btn => {
    btn.addEventListener('click', () => {
      const finishKey = btn.getAttribute('data-finish');
      if (!finishKey) return;

      swatches.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      visualizer.setFrameFinish(finishKey);

      if (activeFinishLabel && FINISHES_DATA[finishKey]) {
        activeFinishLabel.textContent = FINISHES_DATA[finishKey].name;
      }

      // Sync with quote form finish dropdown if present
      const quoteFinishSelect = document.getElementById('quote-finish-select');
      if (quoteFinishSelect) {
        quoteFinishSelect.value = finishKey;
      }
    });
  });

  // Glass Pills
  const glassPills = document.querySelectorAll('.glass-pill-btn');
  const activeGlassLabel = document.getElementById('active-glass-label');

  glassPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const glassKey = pill.getAttribute('data-glass');
      if (!glassKey) return;

      glassPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      visualizer.setGlassOption(glassKey);

      if (activeGlassLabel && GLASS_DATA[glassKey]) {
        activeGlassLabel.textContent = GLASS_DATA[glassKey].name;
      }
    });
  });
}

/**
 * Renders the other 7 architectural systems so the user can easily switch products
 */
function renderOtherSystems(currentProductId) {
  const container = document.getElementById('other-systems-grid');
  if (!container) return;

  const others = PRODUCTS_DATA.filter(p => p.id !== currentProductId);

  let html = '';
  others.forEach(item => {
    html += `
      <a href="product.html?id=${item.id}" class="system-switcher-card">
        <div class="switcher-media">
          <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80';">
          <span class="switcher-num">${item.categoryNumber}</span>
          <span class="switcher-3d-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </svg>
            3D Studio
          </span>
        </div>
        <div class="switcher-body">
          <span class="switcher-cat">${item.categoryName}</span>
          <h4 class="switcher-title">${item.title}</h4>
          <span class="switcher-action">
            Inspect 3D Model
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      </a>
    `;
  });

  container.innerHTML = html;
}

/**
 * Header & Mobile Drawer Controls
 */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  const hamburger = document.getElementById('hamburger-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-nav-backdrop');

  function openMenu() {
    if (!drawer) return;
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    if (hamburger) {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!drawer) return;
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    if (hamburger) {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = drawer && drawer.classList.contains('open');
      if (isOpen) closeMenu();
      else openMenu();
    });
  }

  if (backdrop) backdrop.addEventListener('click', closeMenu);
}

/**
 * Quotation form handler pre-selected for active product
 */
function initQuoteForm(product) {
  const form = document.getElementById('quote-form');
  if (!form) return;

  const catSelect = document.getElementById('quote-category-select');
  if (catSelect && product) {
    catSelect.value = product.id;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const statusMsg = document.getElementById('quote-status-msg');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="btn-spinner"></span>
        <span>Transmitting Architectural Request...</span>
      `;
    }

    setTimeout(() => {
      if (statusMsg) {
        statusMsg.className = 'quote-status-alert success';
        statusMsg.innerHTML = `
          <strong>Thank You. Your Architectural Specification has been received.</strong><br>
          A Senior Technical Consultant from New Golden Enterprises will contact you within 24 hours with custom CAD drawings and quotation estimate.
        `;
        statusMsg.style.display = 'block';
      }

      form.reset();
      if (catSelect) catSelect.value = product.id;

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span>Request Detailed Specification &amp; Pricing</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        `;
      }
    }, 1200);
  });
}

/**
 * Scroll reveal animations
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-fade-up');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}
