import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

import * as utils from './utils';

export const groups = () => {
  const defaults = { duration: 1, ease: 'power2.out', stagger: 0.1 };
  const onload = (self) => self.progress === 1 && self.animation.progress(1);
  const onRefresh = (self) => self.progress === 1 && self.animation.progress(1);

  const attr = 'data-animation-element';
  const groups = queryElements<HTMLDivElement>(`[${attr}="group"]`);

  groups.forEach((group) => {
    let start = 'top 60%';
    const trigger = group.dataset.animationTrigger;
    if (trigger) start = trigger;

    // format for rich text
    const richText = queryElement<HTMLDivElement>(`[${attr}="rich-text"]`, group);
    if (richText) {
      const headings = queryElements<HTMLHeadingElement>('h1, h2, h3, h4, h5, h6', richText);
      headings.forEach((heading) => {
        heading.dataset.animationElement = 'title';
      });
    }

    // reference to elements
    const title = queryElement<HTMLHeadingElement>(`[${attr}="title"]`, group);
    const buttonGroup = queryElement<HTMLDivElement>(`[${attr}="button-group"]`, group);

    const timeline = gsap.timeline({
      defaults,
      scrollTrigger: {
        trigger: group,
        start,
        onload,
        onRefresh,
      },
    });

    if (trigger !== 'transition') {
      const groupTrigger = ScrollTrigger.create({
        animation: timeline,
        trigger: group,
        start,
        onload,
        onRefresh,
      });
    } else {
      // Add an event listener for the custom event
      document.addEventListener('transitionAnimationEvent', function () {
        setTimeout(() => {
          timeline.play();
        }, 1000);
      });
    }

    if (title) utils.splitLines(title, timeline, '0');
    if (buttonGroup) utils.buttons(buttonGroup, timeline, '-=50%');
  });

  // const mm = gsap.matchMedia();
  // mm.add('(min-width: 768px)', () => {
  // });
};
