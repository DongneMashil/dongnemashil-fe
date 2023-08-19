export const urlToMediaFile = (
  url: string,
  type: 'image' | 'video',
  isCover: boolean
) => {
  return {
    type,
    file: url,
    isCover,
  };
};

export const getImageMimeType = (extension: string): string => {
  switch (extension.toLowerCase()) {
    case 'jpeg':
    case 'jpg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    // case 'gif':
    //   return 'image/gif';
    default:
      return 'image/jpeg'; // 기본값
  }
};

export const getVideoMimeType = (extension: string): string => {
  switch (extension.toLowerCase()) {
    case 'mp4':
      return 'video/mp4';
    case 'mov':
      return 'video/mov';
    default:
      return 'video/mp4'; // 기본값
  }
};
