import { useQuery } from '@tanstack/react-query';
import { MyProfile, getMyProfile } from 'api/mypageApi';

import { Button } from 'components/common';
import React, { useState } from 'react';
import { StNavBar } from './NavBar.styles';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Search } from 'assets/icons/Search.svg';
import noUser from 'assets/images/NoUser.gif';
import { useVerifyUser } from 'hooks';

export interface NavBarProps {
  children?: React.ReactNode | null;
  btnLeft?: 'logo' | 'back' | 'cancel' | 'backfunction';
  btnSecondRight?: 'search' | null;
  btnRight?: 'done' | 'mypage' | 'submit' | 'map' | null;
  onClickSubmit?: () => void;
  onClickRight?: () => void;
  onClickLeft?: () => void;
}

export const NavBar = ({
  btnLeft = 'logo',
  btnSecondRight,
  btnRight = 'mypage',
  children,
  onClickSubmit,
  onClickRight,
  onClickLeft,
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
      <Button type={'icon'} onClick={goBack}>
        ⬅️
      </Button>
    ),
    cancel: (
      <Button type={'onlytext'} url={'/'}>
        취소
      </Button>
    ),
    logo: (
      <Button type={'icon'} url={'/'}>
        🏃🏻‍♀️
      </Button>
    ),
    backfunction: (
      <Button type={'onlytext'} onClick={onClickLeft}>
        {'<'}
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
      <Button type={'onlytext'} url={'/'}>
        완료
      </Button>
    ),
    mypage: (
      <Button type={'icon'} url={'/mypage'}>
        <img src={fileUrl || noUser} alt="프로필 이미지" />
      </Button>
    ),
    submit: (
      <Button type={'normal'} onClick={onClickSubmit}>
        Submit
      </Button>
    ),
    map: (
      <Button type={'onlytext'} onClick={onClickRight}>
        지도보기 {'>'}
      </Button>
    ),
  };

  return (
    <StNavBar>
      <div>{leftButtons[btnLeft]}</div>
      {children ? <div>{children}</div> : null}
      <div>
        {btnSecondRight ? secondRightButtons[btnSecondRight] : null}
        {btnRight ? rightButtons[btnRight] : null}
      </div>
    </StNavBar>
  );
};
