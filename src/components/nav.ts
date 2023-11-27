import gsap from 'gsap/all';
import { Flip } from 'gsap/Flip';

import { getCurrentLink } from '$utils/getCurrentLink';
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
    let currentLink = getCurrentLink(navLinks);
    currentLink?.prepend(navLinkBG);

    // prepare the navLinkParagraphs
    const navLinkParagraphs = queryElements('.nav_link-p', nav);
    const currentNavLinkParagraph = queryElement('.nav_link-p', currentLink);
    gsap.to(navLinkParagraphs, { translateY: '2em', opacity: 0, duration: 0 });
    if (currentNavLinkParagraph)
      gsap.to(currentNavLinkParagraph, { translateY: '0em', opacity: 1, duration: 0 });

    // duration
    const duration = 0.75;

    // create imeline for navLinkBG to grow on move
    const navLinkTimeline = gsap
      .timeline()
      .to(navLinkBG, { scaleX: 1.1, duration: duration / 2 })
      .to(navLinkBG, { scaleX: 1, duration: duration / 2 });

    // active link to track the link that is hovered or current
    let activeLink = currentLink;

    // handle the flip on nav link hover in
    navLinks.forEach((navLink) => {
      navLink.addEventListener('mouseenter', () => {
        if (navLink === activeLink) return;
        activeLink = navLink;

        // flip the background into position
        const state = Flip.getState(navLinkBG);
        navLink.prepend(navLinkBG);
        Flip.from(state, {
          duration,
          ease: 'power2.out',
        }).add(navLinkTimeline, 0);

        // get the navLinkParagraph
        const navLinkParagraph = queryElement('.nav_link-p', navLink);
        if (!navLinkParagraph) return;

        // hide all navLinkParagraphs
        gsap.to(navLinkParagraphs, {
          translateY: '2em',
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        });
        gsap.to(navLinkParagraph, {
          translateY: '0em',
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        });
      });
    });

    // reset the flip on hover out of all links
    navLinksWrap.addEventListener('mouseleave', () => {
      currentLink = getCurrentLink(navLinks);
      if (!currentLink || currentLink === activeLink) return;

      activeLink = currentLink;

      // get the navLinkParagraph
      const navLinkParagraph = queryElement('.nav_link-p', currentLink);
      if (!navLinkParagraph) return;

      // hide all navLinkParagraphs
      gsap.to(navLinkParagraphs, {
        translateY: '2em',
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      });
      gsap.to(navLinkParagraph, {
        translateY: '0em',
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      });

      const state = Flip.getState(navLinkBG);
      currentLink.prepend(navLinkBG);
      Flip.from(state, {
        duration: 1,
        ease: 'power2.out',
      }).add(navLinkTimeline, 0);
    });
  }
};
