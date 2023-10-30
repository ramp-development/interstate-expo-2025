import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const transitions = () => {
  const attr = `data-transition`;
  const trigger = queryElement<HTMLDivElement>(`[${attr}=trigger]`);
  if (!trigger) return;

  const links = queryElements<HTMLAnchorElement>('a').filter((link) => {
    const url = new URL(link.href);
    return url.origin === location.origin && url.pathname !== location.pathname;
  });

  console.log(links);

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      trigger?.click();
      setTimeout(() => {
        window.location.href = link.href;
      }, 1000);
    });
  });
};
