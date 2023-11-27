/**
 * Function to get the active link
 * @param links - List of links to check
 * @returns The active link
 */

export const getCurrentLink = (links: HTMLAnchorElement[]): HTMLAnchorElement | undefined => {
  return links.find((link) => link.classList.contains('w--current'));
};
