// import { Splide } from '@splidejs/splide';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const cases = () => {
  console.log('cases');

  const component = queryElement<HTMLDivElement>('.cases');
  if (!component) return;

  const track = queryElement<HTMLDivElement>('.cases-track', component);
  const cases = queryElements<HTMLDivElement>('.cases-item', component);

  if (!track || !cases) return;

  const length = (cases.length - 2) * cases[0].offsetWidth;

  const mm = gsap.matchMedia();
  mm.add('(min-width: 992px)', () => {
    component.style.height = `${window.innerHeight + length}px`;
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: component,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    timeline.to(track, {
      x: -length,
    });

    return () => {
      component.style.removeProperty('height');
    };
  });
};
