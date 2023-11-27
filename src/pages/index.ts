import { cases } from './cases';
import { home } from './home';

export const pages = () => {
  const { pathname } = window.location;
  switch (pathname) {
    case '/':
      home();
      break;
    case '/cases':
      cases();
      break;
  }
};
