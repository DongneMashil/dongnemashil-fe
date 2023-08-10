import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getReviewDetail, ReviewDetail } from 'api/detailApi';
import { useParams } from 'react-router-dom';
import { CommonLayout, NavBar } from 'components/layout';
import { Footer } from 'components/detailPage/Footer/Footer'; // index 오류
import { FooterSpacer, Tag } from 'components/common';
import {
  StDetailPageContainer,
  StDetailPageContent,
  StDetailPageHeader,
  StDetailPageInfo,
  StNavTitle,
  StTagWrapper,
} from './DetailPage.styles';
import noImage from 'assets/noImage/noimage.png';
import noUser from 'assets/noImage/nouser.gif';
import timeAgo from 'utils/timeAgo';

export const DetailPage = () => {
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
            <NavBar btnLeft={'logo'} btnRight={'mypage'}>
              <StNavTitle>{data.title}</StNavTitle>
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
            <StDetailPageHeader>
              <img src={data.profileImgUrl || noUser} />
              <h4>{data.address || '주소없음'}</h4>
              <p>지도보기</p>
            </StDetailPageHeader>
            <StTagWrapper>
              {data.tag.map((tag) => (
                <Tag key={tag.id} text={tag.name} />
              ))}
            </StTagWrapper>
            <StDetailPageInfo>
              <h6>{timeAgo(data.createdAt)}</h6>
            </StDetailPageInfo>
            <StDetailPageContent>
              <img src={data.mainImgUrl || noImage} />
              {data.subImgUrl.map((img, index) => (
                <img key={index} src={img} />
              ))}

              <p ref={contentRef}>{data.content}</p>

              <FooterSpacer />
            </StDetailPageContent>
          </StDetailPageContainer>
        </CommonLayout>
      )}
    </>
  );
};
