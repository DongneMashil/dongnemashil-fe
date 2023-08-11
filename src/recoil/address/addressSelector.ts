import { selector } from "recoil";
import { selectedAddressAtom } from './selectedAddressAtom';

export const addressSelector = selector({
  key: 'addressSelector',
  get: ({ get }) => {
    const fullAddress = get(selectedAddressAtom);

    const parts = fullAddress.split(' ');

    const roadName = parts.slice(2).join(' ');

    return {
      fullAddress,
      roadName,
    };
  },
});
