export interface Page {
  name: string;
  slug: string;
  loader: {
    name: 'home' | 'logo' | 'wordmark';
    color: 'dark' | 'light';
  };
}

export const pages: Page[] = [
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
