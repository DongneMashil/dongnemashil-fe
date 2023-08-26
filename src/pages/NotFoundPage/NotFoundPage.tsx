import React from 'react';
import { ReactComponent as Error404Msg } from 'assets/images/404Msg.svg';
import { ReactComponent as Dongdong } from 'assets/images/Dongdong.svg';
import { CommonLayout } from 'components/layout';
import { StNotFoundContainer, StError404Msg } from './NotFoundPage.styles';
import { AuthNavButton } from 'components/common';

export const NotFoundPage = () => {
  return (
    <CommonLayout>
      <StNotFoundContainer>
        <AuthNavButton type="back" />
        <Error404Msg />
        <Dongdong />
        <StError404Msg>죄송합니다. 페이지를 찾을 수 없습니다.</StError404Msg>
      </StNotFoundContainer>
    </CommonLayout>
  );
};
