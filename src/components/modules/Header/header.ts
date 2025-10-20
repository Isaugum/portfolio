import {
  applyHtmlLang,
  getLanguage,
  setLanguage,
  translateNav,
} from '@utils/i18n';
import { changeTheme } from '@utils/layout.utils';

export const initHeader = () => {
  const header = document.querySelector('.header') as HTMLElement;
  const nav = document.querySelector('.nav') as HTMLElement;
  const mobileToggle = document.querySelector(
    '.header__mobile-toggle'
  ) as HTMLElement;
  const themeToggle = document.querySelector(
    '.header__theme-toggle'
  ) as HTMLElement;
  const progressBar = document.querySelector(
    '.header__progress-bar'
  ) as HTMLElement;
  const langToggle = document.querySelector(
    '.header__lang-toggle'
  ) as HTMLElement;
  const navLinks = document.querySelectorAll('.nav__link');

  let isMenuOpen = false;
  let currentTheme = 'dark';
  let currentLang = getLanguage();

  // Mobile menu toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      isMenuOpen = !isMenuOpen;
      nav.classList.toggle('nav--open', isMenuOpen);

      // Animate hamburger
      const hamburger = mobileToggle.querySelector(
        '.header__hamburger'
      ) as HTMLElement;
      if (hamburger) {
        hamburger.classList.toggle('header__hamburger--open', isMenuOpen);
      }
    });
  }

  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      changeTheme();
    });
  }

  // Language toggle
  const updateNavLanguage = () => {
    const links = document.querySelectorAll('.nav__link');
    links.forEach(link => {
      const href = (link as HTMLAnchorElement).getAttribute('href') || '';
      const key = href.replace('#', '');
      const label = translateNav(key);
      if (label) link.textContent = label.toUpperCase();
    });
  };

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'sl' : 'en';
      setLanguage(currentLang);
      applyHtmlLang();
      (langToggle as HTMLElement).textContent = currentLang.toUpperCase();
      updateNavLanguage();
    });
    // initialize
    (langToggle as HTMLElement).textContent = currentLang.toUpperCase();
  }

  // Scroll progress indicator
  const updateProgress = () => {
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }
  };

  // Active section highlighting
  const updateActiveSection = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('nav__link--active');
        });

        // Add active class to current section link
        const activeLink = document.querySelector(
          `.nav__link[href="#${sectionId}"]`
        );
        if (activeLink) {
          activeLink.classList.add('nav__link--active');
        }
      }
    });
  };

  // Header scroll effect
  const updateHeaderScroll = () => {
    if (window.scrollY > 50) {
      header?.classList.add('header--scrolled');
    } else {
      header?.classList.remove('header--scrolled');
    }
  };

  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = (link as HTMLAnchorElement).getAttribute('href');

      if (href?.startsWith('#')) {
        e.preventDefault();
        // Immediately update active state on click
        navLinks.forEach(l => l.classList.remove('nav__link--active'));
        link.classList.add('nav__link--active');
        const targetSection = document.querySelector(href);

        if (targetSection) {
          const headerHeight = header?.offsetHeight || 0;
          const targetPosition =
            (targetSection as HTMLElement).offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });

          // Close mobile menu if open
          if (isMenuOpen) {
            isMenuOpen = false;
            nav?.classList.remove('nav--open');
            const hamburger = mobileToggle?.querySelector(
              '.header__hamburger'
            ) as HTMLElement;
            if (hamburger) {
              hamburger.classList.remove('header__hamburger--open');
            }
          }
        }
      }
    });
  });

  // Event listeners
  window.addEventListener('scroll', () => {
    updateProgress();
    updateActiveSection();
    updateHeaderScroll();
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', e => {
    if (
      isMenuOpen &&
      !nav.contains(e.target as Node) &&
      !mobileToggle.contains(e.target as Node)
    ) {
      isMenuOpen = false;
      nav?.classList.remove('nav--open');
      const hamburger = mobileToggle?.querySelector(
        '.header__hamburger'
      ) as HTMLElement;
      if (hamburger) {
        hamburger.classList.remove('header__hamburger--open');
      }
    }
  });

  // Initialize
  updateProgress();
  updateActiveSection();
  updateHeaderScroll();
  applyHtmlLang();
  updateNavLanguage();
};
