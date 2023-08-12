import { atom } from 'recoil';

export const commentAddListenerAtom = atom({
  key: 'commentAddListenerAtom', // 이거 설정 안하니깐 작동이 잘 안됨.
  default: false,
});
