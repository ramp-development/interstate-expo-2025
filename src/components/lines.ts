/**
 * Function to initialise all line animations
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// import { SplitText } from 'gsap/SplitText';
import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const lines = () => {
  // eslint-disable-next-line no-console
  console.log('lines');

  const attr = 'data-lines';
  const triggers = queryElements<HTMLDivElement>(`[${attr}="trigger"]`);

  if (triggers.length === 0) return;

  triggers.forEach((trigger) => {
    const lines = queryElement<HTMLElement>(`[${attr}="target"]`, trigger);
    const icon = queryElement<SVGElement>(`[${attr}="icon"]`, trigger);
    if (!lines) return;

    const split = new SplitText(lines, {
      type: 'lines, words',
      linesClass: 'split-line',
      wordsClass: 'split-word',
    });

    const timeline = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'power2.out',
      },
      scrollTrigger: {
        trigger,
        start: 'top 70%',
      },
    });

    if (icon) timeline.from(icon, { opacity: 0, rotateZ: 20 });

    split.lines.forEach((line, index) => {
      timeline.from(line.children, { yPercent: 100 }, index === 0 ? 0 : '<0.2');
    });
  });
};
