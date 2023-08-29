export const getStringByteSize = (s: string): number => {
  return encodeURI(s).split(/%..|./).length - 1;
};
