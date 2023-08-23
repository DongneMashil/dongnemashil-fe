import { atom } from 'recoil';

export const cropProfileImageAtom = atom<string | null>({
  key: 'cropProfileImage',
  default: null,
});
