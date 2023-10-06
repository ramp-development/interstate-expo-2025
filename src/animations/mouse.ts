import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const mouse = () => {
  const mouse = queryElement<HTMLDivElement>('.mouse-cursor');
  if (!mouse) return;

  const mouseText = queryElement<HTMLDivElement>('[data-mouse="text"]', mouse);

  const elements = queryElements<HTMLElement>('a, [href], [data-mouse-class]');
  elements.forEach((element) => {
    const cursorClass = element.dataset.mouseClass ?? 'cc-click';

    element.addEventListener('mouseenter', () => {
      const text = element.dataset.mouseText ?? 'View Case';
      if (mouseText) mouseText.textContent = text;
      mouse.classList.add(cursorClass);
    });

    element.addEventListener('mouseleave', () => {
      mouse.classList.remove(cursorClass);
    });
  });
};
