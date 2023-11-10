import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

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

  // define the required details for each page
  interface Page {
    name: string;
    slug: string;
    loader: {
      name: 'home' | 'logo' | 'wordmark';
      color: 'dark' | 'light';
    };
  }

  // create a directory of pages
  const pages: Page[] = [
    {
      name: 'home',
      slug: '/',
      loader: {
        name: 'logo',
        color: 'dark',
      },
    },
    {
      name: 'cases',
      slug: '/cases',
      loader: {
        name: 'logo',
        color: 'light',
      },
    },
    {
      name: 'services',
      slug: '/services',
      loader: {
        name: 'logo',
        color: 'light',
      },
    },
    {
      name: 'design trial',
      slug: '/design-trial',
      loader: {
        name: 'logo',
        color: 'light',
      },
    },
    {
      name: 'fintech design',
      slug: '/fintech-design',
      loader: {
        name: 'logo',
        color: 'dark',
      },
    },
    {
      name: 'cases',
      slug: '/cases/',
      loader: {
        name: 'wordmark',
        color: 'dark',
      },
    },
  ];

  // get all trigger elements
  const trigger = queryElement<HTMLDivElement>(`[${config.attr}=${config.value}]`);
  if (!trigger) return;

  // get all links to other pages of Basis
  const links = queryElements<HTMLAnchorElement>('a').filter((link) => {
    const url = new URL(link.href);
    return url.origin === location.origin && url.pathname !== location.pathname;
  });

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

      // get the page we're going to
      let page: Page | undefined = undefined;
      if (link.pathname.includes('/cases/')) {
        page = pages.find((page) => page.slug === '/cases/');
      } else {
        page = pages.find((page) => page.slug === link.pathname);
      }

      if (!page) {
        loadLink(link);
        return;
      }

      const loader = queryElement<HTMLDivElement>(`[${config.attr}=${page.loader.name}]`);
      if (!loader) {
        loadLink(link);
        return;
      }

      if (page.loader.color === 'light') {
        loader.style.setProperty('--transition--background', 'var(--swatch--white)');
        loader.style.setProperty('--transition--main', 'var(--swatch--black)');
      } else if (page.loader.color === 'dark') {
        loader.style.setProperty('--transition--background', 'var(--swatch--dark)');
        loader.style.setProperty('--transition--main', 'var(--swatch--white)');
      }

      loader.style.display = 'flex';

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
