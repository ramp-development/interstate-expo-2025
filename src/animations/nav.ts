import { queryElement } from '$utils/queryElement';

export const nav = () => {
  const scrollClass = 'cc-scroll';
  const nav = queryElement<HTMLDivElement>('.nav_component');
  if (!nav) return;

  if (window.scrollY >= 128) nav.classList.add(scrollClass);
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 128) nav.classList.add(scrollClass);
    if (window.scrollY < 128) nav.classList.remove(scrollClass);
  });
};
