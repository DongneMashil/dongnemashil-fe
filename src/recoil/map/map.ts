import { atom } from 'recoil';

export const mapState = atom<kakao.maps.Map | null>({
  key: 'mapState',
  default: null,
});
