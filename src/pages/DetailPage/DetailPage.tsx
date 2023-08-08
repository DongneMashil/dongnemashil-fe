import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getReviewDetail, ReviewDetail } from 'api/detailApi';
import { useParams } from 'react-router-dom';
import { CommonLayout, NavBar } from 'components/layout';
import { Footer } from 'components/detailPage/Footer/Footer'; // index 오류
import { FooterSpacer, Tag } from 'components/common';
import { AroundMapButton } from 'components/common/SpecialButtons/AroundMapButton';
import {
  StDetailPageContainer,
  StDetailPageContent,
  StDetailPageHeader,
  StDetailPageInfo,
  StNavTitle,
  StTagWrapper,
} from './DetailPage.styles';

export const DetailPage = () => {
  const contentRef = React.useRef<HTMLDivElement>(null);
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
  console.log(data);
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
            ></Footer>
          }
        >
          <StDetailPageContainer img={data.img_url}>
            <StDetailPageHeader>
              {/* <img src={data.profileImg_url} /> */}
              <img src="https://source.unsplash.com/random" />

              <h4>서초구 잠원로 155</h4>
              <p>지도보기</p>
            </StDetailPageHeader>
            <StTagWrapper>
              {' '}
              <Tag text="동물친구들" />
              <Tag text="연인이랑" isSelected={true} />
              <AroundMapButton></AroundMapButton>
            </StTagWrapper>
            <StDetailPageInfo>
              <h3>{data.nickname}</h3>
              <h6>{data.createdAt}</h6>
            </StDetailPageInfo>
            <StDetailPageContent>
              <img src="https://source.unsplash.com/random" />

              <img src="https://source.unsplash.com/random" />
              <img src="https://source.unsplash.com/random" />
              <img src={data.img_url} />

              <p ref={contentRef}>
                {data.content}본문의 샘플본문의 샘플본문의 샘플본문의 샘플본문의
                샘플본문의 샘플본문의 샘플본문의 샘플본문의 샘플본문의
                샘플본문의 샘플본문의 샘플본문의 샘플본문의 샘플본문의
                샘플본문의 샘플본문의 샘플본문의 샘플본문의 샘플본문의
                샘플본문의 샘플본문의 샘플본문의 샘플본문의 샘플
              </p>

              <FooterSpacer />
            </StDetailPageContent>
          </StDetailPageContainer>
        </CommonLayout>
      )}
    </>
  );
};
