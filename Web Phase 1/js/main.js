/**
 * NEW GOLDEN ENTERPRISES — MAIN HOMEPAGE CONTROLLER
 * Handles navigation header, mobile drawer, project filters, and smooth animations.
 * Products link directly to their dedicated 3D Studio pages (product.html?id=...).
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Setup Sticky Header & Mobile Drawer
  initHeader();

  // 2. Setup Project Category Filter Tabs
  initProjectFilters();

  // 3. Setup Scroll Reveal Animations
  initScrollAnimations();
});

/**
 * --------------------------------------------------------------------------
 * Header & Mobile Navigation Drawer
 * --------------------------------------------------------------------------
 */
function initHeader() {
  const header = document.getElementById('site-header');
  const hamburger = document.getElementById('hamburger-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // Sticky header on scroll
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Toggle mobile drawer
  function toggleDrawer(open) {
    if (!drawer) return;
    const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
    drawer.classList.toggle('open', isOpen);
    if (backdrop) backdrop.classList.toggle('active', isOpen);
    if (hamburger) {
      hamburger.classList.toggle('is-active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => toggleDrawer());
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => toggleDrawer(false));
  }

  // Close mobile drawer on link click & keyboard Esc
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleDrawer(false);
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) {
      toggleDrawer(false);
    }
  });

  // Highlight active link while scrolling
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 140;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else if (link.getAttribute('href')?.startsWith('#')) {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { passive: true });
}

/**
 * --------------------------------------------------------------------------
 * Architectural Projects Filter Tabs
 * --------------------------------------------------------------------------
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/**
 * --------------------------------------------------------------------------
 * Scroll Reveal Animations (IntersectionObserver)
 * --------------------------------------------------------------------------
 */
function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-fade-up').forEach(el => {
      el.classList.add('is-revealed');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px 80px 0px'
  });

  document.querySelectorAll('.reveal-fade-up').forEach(el => {
    observer.observe(el);
  });
}
