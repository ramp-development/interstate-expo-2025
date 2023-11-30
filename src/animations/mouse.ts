import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const mouse = () => {
  const mouse = queryElement<HTMLDivElement>('.mouse-cursor');
  if (!mouse) return;

  const mouseText = queryElement<HTMLDivElement>('[data-mouse="text"]', mouse);
  if (!mouseText) return;

  const originalText = mouseText.textContent;

  const elements = queryElements<HTMLElement>('a, [href], [data-mouse-class]');
  elements.forEach((element) => {
    const cursorClass = element.dataset.mouseClass ?? 'cc-click';

    element.addEventListener('mouseenter', () => {
      const text = element.dataset.mouseText ?? 'View Case';
      mouseText.textContent = text;
      mouse.classList.add(cursorClass);
    });

    element.addEventListener('mouseleave', (event) => {
      const $relatedTarget = $(event.relatedTarget);
      const $parent = $relatedTarget.closest('[data-mouse-class]');

      if ($parent.length > 0) {
        const parentMouseText = $parent.data('mouse-text');
        const parentMouseClass = $parent.data('mouse-class');

        if (parentMouseText) mouseText.textContent = parentMouseText;
        if (parentMouseClass) mouse.classList.add(parentMouseClass);
        return;
      }

      mouse.classList.remove(cursorClass);
      mouseText.textContent = originalText;
    });
  });
};
