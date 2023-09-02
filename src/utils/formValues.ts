import { atom } from 'recoil';

export interface FormValues {
  title: string;
  content: string;
}

export const formValuesAtom = atom<FormValues>({
  key: 'formValuesAtom',
  default: {
    title: '',
    content: ''
  }
});

export const selectedTagsAtom = atom<string[]>({
  key: 'selectedTagsAtom',
  default: []
});
