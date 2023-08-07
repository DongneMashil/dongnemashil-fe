import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getReviewDetail, ReviewDetail } from 'api/detailApi';
import { useParams } from 'react-router-dom';
import { CommonLayout, NavBar } from 'components/layout';
import { Footer } from 'components/detailPage/Footer/Footer'; // index 오류
import { Tag } from 'components/common';
import { AroundMapButton } from 'components/common/SpecialButtons/AroundMapButton';

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
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>{String(error)}</div>}
      {data && (
        <CommonLayout
          header={
            <NavBar btnLeft={'logo'} btnRight={'mypage'}>
              동네마실
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
              <h1>{data.title}</h1>
              <StDetailPageInfo>
                <h3>{data.nickname}</h3>
                <h6>{data.createdAt}</h6>
              </StDetailPageInfo>
            </StDetailPageHeader>

            <StDetailPageContent>
              <img src="https://source.unsplash.com/random" />
              <Tag text="동물친구들" />
              <Tag text="연인이랑" isSelected={true} />
              <AroundMapButton></AroundMapButton>
              <img src="https://source.unsplash.com/random" />
              <img src="https://source.unsplash.com/random" />
              <img src={data.img_url} />
              <p ref={contentRef}>{data.content}</p>
            </StDetailPageContent>
          </StDetailPageContainer>
        </CommonLayout>
      )}
    </>
  );
};
interface StDetailPageContainerProps {
  img: string;
}

export const StDetailPageContainer = styled.div<StDetailPageContainerProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1rem;
`;
export const StDetailPageHeader = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

export const StDetailPageInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  h3 {
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
  }
  h6 {
    font-size: 16px;
  }
`;

export const StDetailPageContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.3rem;
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  p {
    width: 100%;
    height: 100px;
    font-size: 16px;
    line-height: 1.5;
  }
`;
