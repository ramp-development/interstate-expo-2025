import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

import { Page, pages } from './pages';

export const transitionOut = () => {
  console.log('transitionOut');

  /**
   * OUT:
   * - get the page we're going to
   * - create a directory of loaders (e.g. style and colour)
   * - trigger the correct loader
   */

  // create config
  const config = {
    attr: 'data-transition',
    value: 'out',
  };

  // get all trigger elements
  const trigger = queryElement<HTMLDivElement>(`[${config.attr}=${config.value}]`);
  console.log(trigger);
  if (!trigger) return;

  // get all links to other pages of Basis
  const links = queryElements<HTMLAnchorElement>('a').filter((link) => {
    const url = new URL(link.href);
    if (url.origin !== location.origin) return false;
    if (url.pathname !== location.pathname) return true;
    if (!url.hash) return true;
  });

  console.log(links);

  /**
   * link is clicked
   * - get the page we're going to
   * - get the loader for that page from the directory
   * - set the color variables to the appropriate values
   * - trigger the transition out
   * - wait for the transition to finish and load the new page
   */

  // when the links are clicked, trigger the transition out
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      // get and remove the mouse
      const mouse = queryElement<HTMLDivElement>('.mouse');
      if (mouse) mouse.remove();

      // get the page we're going to
      let page: Page | undefined = undefined;
      if (link.pathname.includes('/cases/')) {
        page = pages.find((page) => page.slug === '/cases/');
      } else {
        page = pages.find((page) => page.slug === link.pathname);
      }

      // load the link if no page is found
      if (!page) {
        loadLink(link);
        return;
      }

      // get the loader for that page from the directory and load the page if the loader is not found
      const loader = queryElement<HTMLDivElement>(`[${config.attr}=${page.loader.name}]`);
      if (!loader) {
        loadLink(link);
        return;
      }

      // get all loaders on the page and hide them
      const loaders = queryElements<HTMLDivElement>(`[${config.attr}]`);
      loaders.forEach((loader) => {
        loader.style.display = 'none';
      });

      // set the color variables to the appropriate values
      if (page.loader.color === 'light') {
        loader.style.setProperty('--transition--background', 'var(--swatch--white)');
        loader.style.setProperty('--transition--main', 'var(--swatch--black)');
      } else if (page.loader.color === 'dark') {
        loader.style.setProperty('--transition--background', 'var(--swatch--dark)');
        loader.style.setProperty('--transition--main', 'var(--swatch--white)');
      }

      // show the relevant loader
      loader.style.display = 'flex';

      // trigger the transition out
      trigger.click();
      setTimeout(() => {
        loadLink(link);
      }, 1000);
    });
  });

  function loadLink(link: HTMLAnchorElement) {
    window.location.href = link.href;
  }
};
