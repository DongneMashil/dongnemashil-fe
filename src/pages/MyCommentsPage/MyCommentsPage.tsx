import { CommonLayout, NavBar } from 'components/layout';
import React from 'react';
import { styled } from 'styled-components';

import { useRecoilValue } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';
import { GetMyCommentsResponse, getMyComments } from 'api/mypageApi';
import { useQuery } from '@tanstack/react-query';

export const MyCommentsPage = () => {
  const userState = useRecoilValue(userProfileSelector);
  const { data } = useQuery<GetMyCommentsResponse, Error>({
    queryKey: ['mycomments', userState.nickName],
    queryFn: () => getMyComments(),
    enabled: userState.isLoggedIn,
    onSuccess: (data: GetMyCommentsResponse) => {
      console.log('🇨🇦' + data);
    },
    onError: (error: Error) => {
      console.log('🎁' + error);
    },
  });

  return (
    <CommonLayout header={<NavBar />} backgroundColor="#f5f5f5">
      <StMyPageContainer>
        {data &&
          data.content.map((item, index) => (
            <StButton key={index}>
              <p>{item.id}</p>
              <p>{item.nickname}</p>
              <p>{item.comment}</p>
              <p>{item.createdAt}</p>
              <img src={item.profileImgUrl || ''} />
            </StButton>
          ))}
      </StMyPageContainer>
    </CommonLayout>
  );
};

const StButton = styled.button`
  ${(props) => props.theme.floatingBox}
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  cursor: pointer;
  width: 95%;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  .title {
    font-size: 1.125rem;
    font-weight: 600;
  }
`;

const StMyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
  height: 100%;
`;
