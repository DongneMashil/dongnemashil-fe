import imageCompression from 'browser-image-compression';
export const useProfileImageUpload = (
  //   initialUrl: string | null | undefined,
  setFileUrl: React.Dispatch<React.SetStateAction<string | null | undefined>>,
  postData: {
    nickname?: string;
    imgUrl?: File | null;
    validation: {
      isValid: boolean;
      isVerified: boolean;
      msg: string;
      alertMsg: string;
    };
  },
  setPostData: React.Dispatch<
    React.SetStateAction<{
      nickname?: string | undefined;
      imgUrl?: File | null | undefined;
      validation: {
        isValid: boolean;
        isVerified: boolean;
        msg: string;
        alertMsg: string;
      };
    }>
  >
) => {
  const options = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 200,
    useWebWorker: true,
  };

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    try {
      const compressedFile = await imageCompression(selectedFile, options);
      const imgUrl = URL.createObjectURL(compressedFile);
      setFileUrl(imgUrl);
      setPostData((prev) => ({
        ...prev,
        imgUrl: compressedFile,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  return { onChangeImage };
};
