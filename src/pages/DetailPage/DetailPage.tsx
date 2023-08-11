import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getReviewDetail, ReviewDetail } from 'api/detailApi';
import { useParams } from 'react-router-dom';
import { CommonLayout, NavBar } from 'components/layout';
import { Footer } from 'components/detailPage/Footer/Footer'; // index 오류
import { FooterSpacer, Tag } from 'components/common';
import {
  StCreatedTime,
  StDetailPageContainer,
  StDetailPageContent,
  StDetailPageHeader,
  StNavTitle,
  StTagWrapper,
} from './DetailPage.styles';
import noImage from 'assets/noImage/noimage.png';
import noUser from 'assets/noImage/nouser.gif';
import timeAgo from 'utils/timeAgo';
import { useRecoilValue } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';
import { useVerifyUser } from 'hooks';

export const DetailPage = () => {
  const userState = useRecoilValue(userProfileSelector);
  const { data: userData } = useVerifyUser(true);
  useEffect(() => {
    console.log('current user state: ', userState);
    if (userData) {
      console.log('useVerifyUser data: ', userData);
    }
  }, [userState]);

  const contentRef = useRef<HTMLDivElement>(null);

  const { reviewId } = useParams<{ reviewId: string }>();
  if (!reviewId) {
    throw new Error('Review ID is missing');
  }

  const { data, isLoading, isError, error } = useQuery<ReviewDetail, Error>({
    queryKey: ['reviewDetail', reviewId],
    queryFn: () => getReviewDetail(reviewId),
    enabled: !!reviewId,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleGotoContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>{String(error)}</div>}
      {data && (
        <CommonLayout
          header={
            <NavBar btnLeft={'logo'} btnRight={'close'}>
              <StNavTitle>{data.address}</StNavTitle>
            </NavBar>
          }
          footer={
            <Footer
              reviewId={reviewId}
              likeCnt={data.likeCnt}
              commentCnt={data.commentCnt}
              onClick={handleGotoContent}
              isLiked={data.likebool}
            ></Footer>
          }
        >
          <StDetailPageContainer>
            <StCreatedTime>{timeAgo(data.createdAt)}</StCreatedTime>
            <StDetailPageHeader>
              <img src={data.profileImgUrl || noUser} />
              <h4>{data.title || '제목없음'}</h4>
            </StDetailPageHeader>

            <StDetailPageContent>
              <img src={data.mainImgUrl || noImage} />
              {data.subImgUrl.map((img, index) =>
                img !== '' ? <img key={index} src={img} /> : null
              )}

              <p ref={contentRef}>{data.content}</p>
              <StTagWrapper>
                {data.tag.map((tag) => (
                  <Tag key={tag.id} text={tag.name} />
                ))}
              </StTagWrapper>
              <FooterSpacer />
            </StDetailPageContent>
          </StDetailPageContainer>
        </CommonLayout>
      )}
    </>
  );
};
