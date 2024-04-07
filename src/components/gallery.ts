import { queryElement } from '$utils/queryElement';
import { simulateEvent } from '$utils/simulateEvent';

export const gallery = () => {
  // eslint-disable-next-line no-console
  console.log('gallery');

  const component = queryElement('.gallery_component');
  if (!component) return;

  const trigger = queryElement('.w-lightbox', component) as HTMLLinkElement;
  const button = queryElement('.btn_main_wrap', component) as HTMLDivElement;

  button.addEventListener('click', () => {
    simulateEvent(trigger, 'click');
  });
};
