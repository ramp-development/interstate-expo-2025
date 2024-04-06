import { queryElement } from '$utils/queryElement';

/**
 * Function to initialise the countdown timer
 * @returns nothing
 */

export const countdown = (): void => {
  // eslint-disable-next-line no-console
  console.log('countdown');

  const attr = 'data-countdown';
  const component = queryElement(`[${attr}="component"]`);
  if (!component) return;

  const days = queryElement(`[${attr}="days"]`, component) as HTMLDivElement;
  const hours = queryElement(`[${attr}="hours"]`, component) as HTMLDivElement;
  const minutes = queryElement(`[${attr}="minutes"]`, component) as HTMLDivElement;
  const seconds = queryElement(`[${attr}="seconds"]`, component) as HTMLDivElement;

  if (!days || !hours || !minutes || !seconds) return;

  const target = 'December 31 2024 06:59:59 UTC+9'; //UTC+9 converts to Japan Standard time (JST)

  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  const countDown = new Date(target).getTime(),
    tick = setInterval(function () {
      const now = new Date().getTime(),
        distance = countDown - now;

      days.textContent = Math.floor(distance / day).toString();
      hours.textContent = Math.floor((distance % day) / hour).toString();
      minutes.textContent = Math.floor((distance % hour) / minute).toString();
      seconds.textContent = Math.floor((distance % minute) / second).toString();

      //Do something when countdown is complete
      if (distance < 0) {
        component.style.display = 'none';
        clearInterval(tick);
      }
    }, 0);
};
