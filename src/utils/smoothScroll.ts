import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const smoothScroll = (): void => {
  const lenis = new Lenis();

  lenis.on('scroll', ScrollTrigger.update);

  // const { actualScroll } = lenis;
  // lenis.scrollTo(actualScroll + 100);
  // lenis.scrollTo(actualScroll);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
};
