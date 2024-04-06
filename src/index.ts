import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import { smoothScroll } from '$utils/smoothScroll';

import { components } from './components';

window.Webflow ||= [];
window.Webflow.push(() => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  console.log('interstate-expo-2025');

  components();
  smoothScroll();
});
