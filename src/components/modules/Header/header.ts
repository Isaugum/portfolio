import {
  applyHtmlLang,
  getLanguage,
  setLanguage,
  translateNav,
} from '@utils/i18n';
import { changeTheme } from '@utils/layout.utils';

export const initHeader = () => {
  const header = document.querySelector('.header') as HTMLElement;
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

  let currentTheme = 'dark';
  let currentLang = getLanguage();
  let programmaticScroll = false;
  let scrollEndTimer: number | undefined;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      changeTheme();
    });
  }

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
    (langToggle as HTMLElement).textContent = currentLang.toUpperCase();
  }

  const updateProgress = () => {
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }
  };

  const scrollActiveLinkIntoView = (activeLink: Element) => {
    const navContainer = activeLink.parentElement; // assumes navLinks share same parent
    if (!navContainer) return;

    const linkRect = (activeLink as HTMLElement).getBoundingClientRect();
    const containerRect = navContainer.getBoundingClientRect();

    // Calculate offset to center the link in the navbar
    const offset =
      linkRect.left -
      containerRect.left -
      containerRect.width / 2 +
      linkRect.width / 2;

    navContainer.scrollBy({
      left: offset,
      behavior: 'smooth',
    });
  };

  const updateActiveSection = () => {
    if (programmaticScroll) return;
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 300;

    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('nav__link--active');
        });

        const activeLink = document.querySelector(
          `.nav__link[href="#${sectionId}"]`
        );
        if (activeLink) {
          activeLink.classList.add('nav__link--active');
          scrollActiveLinkIntoView(activeLink);
        }
      }
    });
  };

  const updateHeaderScroll = () => {
    if (window.scrollY > 50) {
      header?.classList.add('header--scrolled');
    } else {
      header?.classList.remove('header--scrolled');
    }
  };

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = (link as HTMLAnchorElement).getAttribute('href');

      if (href?.startsWith('#')) {
        e.preventDefault();
        programmaticScroll = true;
        navLinks.forEach(l => l.classList.remove('nav__link--active'));
        link.classList.add('nav__link--active');
        scrollActiveLinkIntoView(link);
        const targetSection = document.querySelector(href);

        if (targetSection) {
          const headerHeight = header?.offsetHeight || 0;
          const targetPosition =
            (targetSection as HTMLElement).offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });

          if (scrollEndTimer) window.clearTimeout(scrollEndTimer);
          scrollEndTimer = window.setTimeout(() => {
            programmaticScroll = false;
            updateActiveSection();
          }, 250);
        }
      }
    });
  });

  window.addEventListener('scroll', () => {
    updateProgress();
    if (programmaticScroll) {
      if (scrollEndTimer) window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        programmaticScroll = false;
        updateActiveSection();
      }, 200);
    } else {
      updateActiveSection();
    }
    updateHeaderScroll();
  });

  updateProgress();
  updateActiveSection();
  updateHeaderScroll();
  applyHtmlLang();
  updateNavLanguage();
};
