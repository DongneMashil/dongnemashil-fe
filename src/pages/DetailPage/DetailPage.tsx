import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getReviewDetail, ReviewDetailResponse } from 'api/detailApi';
import { useParams } from 'react-router-dom';
import { CommonLayout, NavBar } from 'components/layout';
import { Footer } from 'components/detailPage/Footer/Footer'; // index 오류
import { FooterSpacer, Tag } from 'components/common';
import {
  StCreatedTime,
  StDetailPageContainer,
  StDetailPageContent,
  StDetailPageHeader,
  StDetailTitle,
  StNavTitle,
  StTagWrapper,
} from './DetailPage.styles';
import noImage from 'assets/images/NoImage.png';
import noUser from 'assets/images/NoUser.gif';
import timeAgo from 'utils/timeAgo';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';
import { useVerifyUser } from 'hooks';
import { DetailMap } from 'components/detailPage';
import { commentCountAtom } from 'recoil/commentCount/commentCountAtom';

export const DetailPage = () => {
  const [isMapOpen, setIsMapOpen] = React.useState(false);
  const setCommentCount = useSetRecoilState(commentCountAtom);
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

  const { data } = useQuery<ReviewDetailResponse, Error>({
    queryKey: ['reviewDetail', reviewId],
    queryFn: () => getReviewDetail(reviewId),
    enabled: !!reviewId,
    onSuccess: (data) => {
      console.log(data);
      setCommentCount(data.commentCnt); // Recoil 상태에 댓글 개수를 설정
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

  const defaultAddress = '서울특별시 마포구 와우산로 94';
  return (
    <>
      {isMapOpen ? (
        <CommonLayout
          header={
            <NavBar
              btnLeft="closeModal"
              onClickLeft={() => setIsMapOpen(false)}
            />
          }
          backgroundColor="#FFF"
        >
          <DetailMap
            height="100%"
            width="100%"
            initMap={(map, setMapCenterByAddress) => {
              setMapCenterByAddress(data ? data.address : defaultAddress, map);
            }}
          />
        </CommonLayout>
      ) : (
        <CommonLayout
          header={
            <NavBar
              btnLeft={'logo'}
              btnRight={'map'}
              onClickRight={() => setIsMapOpen(true)}
            >
              {data && <StNavTitle>{data.address}</StNavTitle>}
            </NavBar>
          }
          footer={
            data && (
              <Footer
                reviewId={reviewId}
                likeCnt={data.likeCnt}
                onClick={handleGotoContent}
                isLiked={data.likebool}
              ></Footer>
            )
          }
          backgroundColor="#FFF"
        >
          <StDetailPageContainer>
            {data && (
              <>
                <StDetailTitle>{data.title || '제목없음'}</StDetailTitle>
                <StDetailPageHeader>
                  <img src={data.profileImgUrl || noUser} />
                  <span className="nickname">{data.nickname}</span>
                  <StCreatedTime>{timeAgo(data.createdAt)}</StCreatedTime>
                </StDetailPageHeader>
                <StDetailPageContent>
                  <img className="detailimg" src={data.mainImgUrl || noImage} />
                  {data.subImgUrl.map((img, index) =>
                    img !== '' ? <img key={index} src={img} /> : null
                  )}

                  <p ref={contentRef}>{data.content}</p>
                  <StTagWrapper>
                    {data.tag.map((tag) => (
                      <Tag
                        key={tag.id}
                        text={tag.name}
                        isHoverEnabled={false}
                      />
                    ))}
                  </StTagWrapper>
                  <FooterSpacer />
                </StDetailPageContent>
              </>
            )}
          </StDetailPageContainer>
        </CommonLayout>
      )}
    </>
  );
};
