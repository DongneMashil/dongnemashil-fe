import { atom } from 'recoil';

export type MediaFileType = File | string;

export interface MediaFile{
  type: 'image' | 'video';
  file: MediaFileType;
  isCover: boolean;
}

export const mediaFilesAtom = atom<MediaFile[]>({
  key: 'mediaFilesAtom',
  default:[]
})
