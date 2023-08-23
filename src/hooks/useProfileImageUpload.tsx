import imageCompression from 'browser-image-compression';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { croppedImageFileSelector } from 'recoil/cropProfileImage/cropProfileImageSelector';
export const useProfileImageUpload = (
  setFileUrl: React.Dispatch<React.SetStateAction<string | null | undefined>>,
  setPostData: React.Dispatch<
    React.SetStateAction<{
      nickname?: string | undefined;
      imgFile?: File | null | undefined;
      validation: {
        isValid: boolean;
        isVerified: boolean;
        msg: string;
        alertMsg: string;
      };
    }>
  >
) => {
  const croppedFile = useRecoilValue(croppedImageFileSelector);

  const options = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 100,
    useWebWorker: true,
  };

  useEffect(() => {
    const onChangeImage = async () => {
      if (!croppedFile) return;

      try {
        const compressedFile = await imageCompression(croppedFile, options);
        const imgUrl = URL.createObjectURL(compressedFile);
        setFileUrl(imgUrl);
        setPostData((prev) => ({
          ...prev,
          imgFile: compressedFile,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    onChangeImage();
  }, [croppedFile, setFileUrl, setPostData]);
};
