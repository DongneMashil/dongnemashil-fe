import { selector } from 'recoil';
import { cropProfileImageAtom } from './cropProfileImageAtom';

export const croppedImageURLSelector = selector<string | null>({
  key: 'croppedImageURLSelector',
  get: ({ get }) => {
    const base64Data = get(cropProfileImageAtom);
    return base64Data;
  },
});

export const croppedImageFileSelector = selector<File | null>({
  key: 'croppedImageFileSelector',
  get: ({ get }) => {
    const base64Data = get(cropProfileImageAtom) as string;
    if (!base64Data) return null;

    // type 추출
    const mimeTypeMatch = base64Data.match(/^data:(.*?);base64,/);

    // type이 존재하지 않을 경우 기본 image/jpeg 사용
    const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/jpeg';
    const fileExtension = mimeType.split('/')[1] || 'jpg'; // 없으면 jpg로 설정

    const byteString = atob(base64Data.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: mimeType });
    return new File([blob], `croppedImage.${fileExtension}`, {
      type: mimeType,
    });
  },
});
