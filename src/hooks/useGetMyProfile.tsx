import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyProfile, MyProfile } from 'api/mypageApi';
import axios from 'axios';
import { getExtensionName } from 'components/myProfilePage';
import { UserStateRes } from 'api/loginApi';
import DefaultImage from 'assets/images/NoUser.jpg';
import { base64ToBlob } from 'utils';
export const useGetMyProfile = (userData: UserStateRes | undefined) => {
  const [fileUrl, setFileUrl] = useState<string | null | undefined>(null);
  const [postData, setPostData] = useState<{
    nickname?: string;
    imgFile?: File | null;
    validation: {
      isValid: boolean;
      isVerified: boolean;
      msg: string;
      alertMsg: string;
    };
  }>({
    nickname: userData?.nickname,
    imgFile: null,
    validation: {
      isValid: true,
      isVerified: false,
      msg: '',
      alertMsg: '',
    },
  });

  // 유저 정보 조회
  useQuery<MyProfile>({
    queryKey: ['myPage', userData?.nickname],
    queryFn: () => getMyProfile(),
    onSuccess: async (data) => {
      setFileUrl(data.profileImgUrl);
      try {
        const response = await axios.get(
          `${data.profileImgUrl!}?timestamp=${Date.now()}`,
          {
            responseType: 'blob',
          }
        );
        console.log(`Response Status: ${response.status}`);

        const blob = response.data;
        const extension = getExtensionName(data.profileImgUrl!);
        const finalFilename = 'prev.' + extension;
        const prevImage = new File([blob], finalFilename, { type: blob.type });
        setPostData((prev) => ({
          ...prev,
          imgFile: prevImage,
          nickname: data.nickname,
        }));
      } catch (error) {
        setFileUrl(DefaultImage); //이미지 다운로드 실패시 기본 이미지 삽입
        console.log('✨defalultImage: ' + DefaultImage);
        console.log('✨setfileUrl: ' + fileUrl);

        const defaultBlob = base64ToBlob(DefaultImage, 'image/jpg');
        // const defaultBlob = new Blob([DefaultImage], { type: 'image/jpg' });
        const defaultFile = new File([defaultBlob], 'default.jpg', {
          type: 'image/jpg',
        });

        setPostData((prev) => ({
          ...prev,
          imgFile: defaultFile,
          nickname: data.nickname,
        }));
        console.error('이미지 다운로드 실패해서 기본 이미지 삽입:', error);
      }
    },
    onError: (error) => {
      console.log('🔴getMyprofile에러:' + error);
    },
  });

  return {
    fileUrl,
    setFileUrl,
    postData,
    setPostData,
  };
};
