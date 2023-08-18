import { atom, selector } from 'recoil';

export const selectedTagsState = atom<string[]>({
  key: 'selectedTagsState',
  default: [],
});

export const sortTypeState = atom<string>({
  key: 'sortTypeState',
  default: 'likes',
});

export const selectedTagSelector = selector<string | null>({
  key: 'selectedTagSelector',
  get: ({ get }) => {
    const selectedTags = get(selectedTagsState);
    if (selectedTags.length > 0) {
      return selectedTags.join(',');
    }
    return null;
  },
});

export const sortTypeSelector = selector<string>({
  key: 'sortTypeSelector',
  get: ({ get }) => {
    return get(sortTypeState);
  },
});
