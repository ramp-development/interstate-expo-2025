export const buttons = (buttonGroup: Element, timeline: GSAPTimeline, delay: string) => {
  timeline.from(
    buttonGroup.childNodes,
    {
      opacity: 0,
      translateX: '1rem',
      stagger: 0.2,
    },
    delay
  );
};
