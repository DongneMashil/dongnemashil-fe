import { atom } from 'recoil';

type CropProfileImageType = {
  file: File | null;
  imgUrl: string | null;
};

export const cropProfileImageAtom = atom<CropProfileImageType>({
  key: 'cropProfileImage',
  default: {
    file: null,
    imgUrl: null,
  },
});
