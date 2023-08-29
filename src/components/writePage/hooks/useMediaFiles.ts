import { ReviewData } from 'api/reviews';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { mediaFilesAtom } from 'recoil/mediaFile/mediaFileAtom';
import { urlToMediaFile } from 'utils';

export const useMediaFiles = (reviewData: ReviewData | undefined) => {
  const [mediaFiles, setMediaFiles] = useRecoilState(mediaFilesAtom);

  useEffect(() => {
    if (reviewData) {
      const mediaFilesData = [
        urlToMediaFile(reviewData.mainImgUrl, 'image', true),
        ...reviewData.subImgUrl
          .filter((url: string) => url.trim() !== '')
          .map((url: string) => urlToMediaFile(url, 'image', false)),
        reviewData.videoUrl
          ? urlToMediaFile(reviewData.videoUrl, 'video', false)
          : null,
      ].filter(Boolean) as {
        type: 'image' | 'video';
        file: string;
        isCover: boolean;
      }[];

      setMediaFiles(mediaFilesData);
    }
  }, [reviewData, setMediaFiles]);

  return { mediaFiles, setMediaFiles };
};
