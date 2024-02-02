import { gsap } from 'gsap';

import { queryElement } from '$utils/queryElement';

export const home = () => {
  // get the component
  const component = queryElement<HTMLDivElement>('.apps_component');
  if (!component) return;

  // find the necessary elements
  const scrollWrapper = queryElement<HTMLDivElement>('.apps_media-wrapper', component);
  const scrollCTA = queryElement<HTMLDivElement>('.apps_scroll', component);
  if (!scrollWrapper || !scrollCTA) return;

  // calculate the maximum srollLeft value
  const maxScrollLeft = scrollWrapper.scrollWidth - scrollWrapper.clientWidth;
  const scrollCutOff = maxScrollLeft * 0.5;

  // hide & show the scroll CTA
  scrollWrapper.addEventListener('scroll', () => {
    const scroll = scrollWrapper.scrollLeft;

    if (scroll <= scrollCutOff) {
      gsap.to(scrollCTA, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(scrollCTA, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  });
};
