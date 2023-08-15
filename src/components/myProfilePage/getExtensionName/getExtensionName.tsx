export const getExtensionName = (url: string): string => {
  const match = url.match(/\.([0-9a-z]+)(?:[?#]|$)/i);
  return match ? match[1] : '';
};
