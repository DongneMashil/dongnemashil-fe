import { useQuery } from '@tanstack/react-query';
import { MyProfile, getMyProfile } from 'api/mypageApi';

import { Button } from 'components/common';
import React, { useState } from 'react';
import {
  StCenterWrapper,
  StLeftWrapper,
  StNavBar,
  StRighttWrapper,
} from './NavBar.styles';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Search } from 'assets/icons/Search.svg';
import noUser from 'assets/images/NoUser.gif';
import { useVerifyUser } from 'hooks';
import { ReactComponent as ChevronLeft } from 'assets/icons/ChevronLeft.svg';

export interface NavBarProps {
  children?: React.ReactNode | null;
  btnLeft?: 'logo' | 'back' | 'cancel' | 'closeModal';
  btnSecondRight?: 'search' | null;
  btnRight?: 'done' | 'mypage' | 'submit' | 'map' | null;
  onClickSubmit?: () => void;
  onClickRight?: () => void;
  onClickLeft?: () => void;
  onClickActive?: boolean;
}

export const NavBar = ({
  btnLeft = 'logo',
  btnSecondRight,
  btnRight = 'mypage',
  children,
  onClickSubmit,
  onClickRight,
  onClickLeft,
  onClickActive = true,
}: NavBarProps) => {
  const { data: userData } = useVerifyUser(true);
  const [fileUrl, setFileUrl] = useState<string | null | undefined>(null);

  const { data } = useQuery<MyProfile, Error>({
    queryKey: ['myPage', userData?.nickname],
    queryFn: () => getMyProfile(),
    // enabled: !!userData?.nickname,
    onSuccess: (data) => {
      console.log(data);
      setFileUrl(data.profileImgUrl);
    },
    onError: (error) => {
      console.log('🔴' + error);
    },
  });
  console.log(data);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const leftButtons = {
    back: (
      <Button type={'iconLeft'} onClick={goBack}>
        <ChevronLeft />
      </Button>
    ),
    cancel: (
      <Button type={'onlyText'} url={'/'}>
        취소
      </Button>
    ),
    logo: (
      <Button type={'icon'} url={'/'}>
        🏃🏻‍♀️
      </Button>
    ),
    closeModal: (
      <Button type={'iconLeft'} onClick={onClickLeft}>
        <ChevronLeft />
      </Button>
    ),
  };

  const secondRightButtons = {
    search: (
      <Button type={'icon'} url={'/search'}>
        <Search width="21" height="21" />
      </Button>
    ),
  };

  const rightButtons = {
    done: (
      <Button
        type="confirm"
        inputType="button"
        onClick={onClickRight}
        $active={onClickActive}
      >
        완료
      </Button>
    ),
    mypage: userData ? (
      <Button type={'icon'} url={'/mypage'}>
        <img src={fileUrl || noUser} alt="프로필 이미지" />
      </Button>
    ) : (
      <Button type={'onlyText'} url={'/login'}>
        로그인
      </Button>
    ),
    submit: (
      <Button type={'confirm'} onClick={onClickSubmit} $active={onClickActive}>
        완료
      </Button>
    ),
    map: (
      <Button type={'onlyText'} onClick={onClickRight}>
        지도보기 {'>'}
      </Button>
    ),
  };

  return (
    <StNavBar>
      <StLeftWrapper>{leftButtons[btnLeft]}</StLeftWrapper>
      {children ? <StCenterWrapper>{children}</StCenterWrapper> : null}
      <StRighttWrapper>
        {btnSecondRight ? secondRightButtons[btnSecondRight] : null}
        {btnRight ? rightButtons[btnRight] : null}
      </StRighttWrapper>
    </StNavBar>
  );
};
