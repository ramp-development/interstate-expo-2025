import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import { animations } from './animations';
import { initComponents } from './components';
import { pages } from './pages';
import { transitions } from './transitions';

window.Webflow ||= [];
window.Webflow.push(() => {
  gsap.registerPlugin(Flip, ScrollTrigger, SplitText);

  transitions();
  pages();
  initComponents();
  animations();
});
