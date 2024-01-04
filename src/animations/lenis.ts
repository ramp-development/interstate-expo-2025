import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const lenis = () => {
  if (Webflow.env('editor') !== undefined) return;

  const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.7,
    infinite: false,
    gestureOrientation: 'vertical',
    normalizeWheel: false,
    smoothTouch: false,
  });

  requestAnimationFrame(raf);
  connectToScrollTrigger();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  function connectToScrollTrigger() {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
  }
};
