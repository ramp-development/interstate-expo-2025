import { simulateEvent } from '@finsweet/ts-utils';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

import { queryElement } from '$utils/queryElement';

export const home = () => {
  console.log('home');

  const { referrer } = document;

  /**
   * if coming from within the site
   * - show the transition element
   * else
   * - show the loader element
   */

  // get elements
  const revealAttribute = 'data-reveal';
  const wrapper = queryElement<HTMLDivElement>(`[${revealAttribute}="wrapper"]`);
  const transitionEl = queryElement<HTMLDivElement>(`[${revealAttribute}="transition"]`, wrapper);
  const loaderEl = queryElement<HTMLDivElement>(`[${revealAttribute}="loader"]`, wrapper);
  const close = queryElement<HTMLDivElement>(`[${revealAttribute}="close"]`, wrapper);

  console.log(referrer, window.location.hostname);
  if (referrer.includes(window.location.hostname)) {
    console.log('transition');
    transition();
  } else {
    console.log('loader');
    loader();
  }

  function transition() {
    if (loaderEl) loaderEl.remove();
    if (close) simulateEvent(close, 'click');
  }

  function loader() {
    if (transitionEl) transitionEl.remove();

    const customEase =
      'M0,0,C0.061,0.186,0.198,0.488,0.482,0.568,0.564,0.591,0.741,0.561,0.882,0.668,1.009,0.765,0.986,1,1,1';
    const counter = { value: 0 };
    let duration = 6;

    const attr = 'data-loader';
    const loaderText = queryElement<HTMLDivElement>(`[${attr}="text"]`);
    const loaderBackground = queryElement<HTMLDivElement>(`[${attr}="background"]`);

    if (!loaderText || !loaderBackground) return;

    // If not a first time visit in this tab
    if (sessionStorage.getItem('visited') !== null) {
      duration = 1;
    }

    sessionStorage.setItem('visited', 'true');

    const updateLoaderText = () => {
      const progress = Math.round(counter.value);
      loaderText.textContent = `${progress}%`;
    };

    const endLoaderAnimation = () => {
      if (close) {
        console.log('end loader animation');
        simulateEvent(close, 'click');
      }
    };

    const timeline = gsap.timeline({
      defaults: {
        duration,
        ease: CustomEase.create('custom', customEase),
      },
      onComplete: endLoaderAnimation,
    });

    timeline
      .to(counter, {
        value: 100,
        onUpdate: updateLoaderText,
      })
      .to(
        loaderBackground,
        {
          width: '100%',
        },
        '<'
      );
  }
};
