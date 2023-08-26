import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyProfile, MyProfile } from 'api/mypageApi';
import axios from 'axios';
import { getExtensionName } from 'components/myProfilePage';
import { UserStateRes } from 'api/loginApi';

export const useGetMyProfile = (
  userData: UserStateRes | undefined,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>
) => {
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
      alertMsg: '닉네임을 중복확인을 해주세요!',
    },
  });

  // 유저 정보 조회
  useQuery<MyProfile, Error>({
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
        setFileUrl(null); //이미지 다운로드 실패시 미리보기 이미지 제거
        setPostData((prev) => ({
          ...prev,
          nickname: data.nickname,
        }));
        console.error('Error fetching the image:', error);
        setErrorMsg(
          '프로필 사진을 불러오는데 실패했습니다. 새로 등록하고 관리자에게 문의해주세요.'
        );
      }
    },
    onError: (error) => {
      console.log('🔴' + error);
    },
  });

  return {
    fileUrl,
    setFileUrl,
    postData,
    setPostData,
  };
};
