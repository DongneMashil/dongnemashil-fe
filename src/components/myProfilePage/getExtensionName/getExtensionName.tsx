export const getExtensionName = (mimeType: string): string => {
  const extensions: { [key: string]: string } = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/tiff': '.tif',
    'image/bmp': '.bmp',
    'image/x-icon': '.ico',
    'image/svg+xml': '.svg',
    'image/heif': '.heif',
    'image/heic': '.heic',
    'image/avif': '.avif',
    'image/apng': '.apng',
    'image/flif': '.flif',
  };

  return extensions[mimeType] || ''; // MIME 타입에 해당하는 확장자가 없으면 빈 문자열 반환
};
