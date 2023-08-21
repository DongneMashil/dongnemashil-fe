import { atom } from 'recoil';

export const historyStackState = atom<string[]>({
  key: 'historyStackState',
  default: [],
});
