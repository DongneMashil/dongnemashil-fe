import { atom } from 'recoil';

export const commentCountAtom = atom({
  key: 'commentCountState',
  default: 0,
});
