import gsap from 'gsap/all';
import { Flip } from 'gsap/Flip';

import { getActiveLink } from '$utils/getActiveLink';
import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const nav = () => {
  const nav = queryElement('.nav_component');
  if (!nav) return;

  // get references to necessary elements
  const mouse = queryElement<HTMLDivElement>('.mouse');
  const navMenuButton = queryElement<HTMLDivElement>('.nav_menu-btn', nav);
  const navLinksWrap = queryElement<HTMLDivElement>('.nav_links', nav);
  const navLinks = queryElements<HTMLAnchorElement>('.nav_link', nav);
  const navLinkBG = queryElement<HTMLDivElement>('.nav_link-bg', nav);

  if (navMenuButton) {
    // prep the nav menu button
    navMenuButton.style.width = '4em';
    navMenuButton.style.height = '22px';
  }

  if (navLinkBG && navLinksWrap) {
    // set the active link
    let activeLink = getActiveLink(navLinks);
    activeLink?.prepend(navLinkBG);

    // duration
    const duration = 0.75;

    // create timeline for navLinkBG to grow on move
    const timeline = gsap
      .timeline()
      .to(navLinkBG, { scaleX: 1.1, duration: duration / 2 })
      .to(navLinkBG, { scaleX: 1, duration: duration / 2 });

    // handle the flip on nav link hover in
    navLinks.forEach((navLink) => {
      navLink.addEventListener('mouseenter', () => {
        // if (mouse) mouse.style.mixBlendMode = 'difference';
        const state = Flip.getState(navLinkBG);
        navLink.prepend(navLinkBG);
        Flip.from(state, {
          duration,
          ease: 'power2.out',
        }).add(timeline, 0);
      });
    });

    // reset the flip on hover out of all links
    navLinksWrap.addEventListener('mouseleave', () => {
      // if (mouse) mouse.style.removeProperty('mix-blend-mode');
      activeLink = getActiveLink(navLinks);
      if (!activeLink) return;

      const state = Flip.getState(navLinkBG);
      activeLink.prepend(navLinkBG);
      Flip.from(state, {
        duration: 1,
        ease: 'power2.out',
      }).add(timeline, 0);
    });
  }
};
