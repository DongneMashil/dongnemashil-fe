import { atom } from "recoil";

export const selectedAddressAtom = atom({
  key: 'selectedAddress',
  default: '서울시 영등포구 여의동로 330',
});
