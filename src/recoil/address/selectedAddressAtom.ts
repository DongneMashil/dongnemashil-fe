import { atom } from 'recoil';

export const selectedAddressAtom = atom({
  key: 'selectedAddress',
  default: '서울특별시 성동구 뚝섬로 273',
});

export const latitudeAtom = atom<number | null>({
  key: 'latitude',
  default: null,
});

export const longitudeAtom = atom<number | null>({
  key: 'longitude',
  default: null,
});