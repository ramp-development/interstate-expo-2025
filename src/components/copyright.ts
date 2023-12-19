import { queryElements } from '$utils/queryElements';

export const copyright = () => {
  // get the current year
  const date = new Date();
  const year = date.getFullYear();

  // update all dynamic elements
  const components = queryElements<HTMLSpanElement>('[data-dynamic="year"]');
  components.forEach((component) => {
    component.textContent = `${year}`;
  });
};
