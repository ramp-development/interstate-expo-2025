import Splide, { type Options } from '@splidejs/splide';

import { queryElements } from '$utils/queryElements';

/**
 * Function to initialise all sliders
 *
 * @todo check why the gap on 'transformation' is still applied via Webflow
 */

export const sliders = (): void => {
  // eslint-disable-next-line no-console
  console.log('sliders');

  const components = queryElements<HTMLDivElement>('.splide');
  components.forEach((component) => {
    const name = component.classList.contains('is-gallery')
      ? 'gallery'
      : component.classList.contains('is-transformation')
      ? 'transformation'
      : component.classList.contains('is-gigaprojects')
      ? 'gigaprojects'
      : 'failed';

    const options: Options = {
      pagination: false,
      gap: 0,
    };

    switch (name) {
      case 'gallery':
        options.autoWidth = true;
        break;
      case 'transformation':
        options.gap = '1rem';
        options.width = '80%';
        break;
      case 'gigaprojects':
        options.autoWidth = true;
        break;
    }

    const slider = new Splide(component, options);
    slider.mount();
  });
};
