import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteReviewDetail,
  getReviewDetail,
  ReviewDetailResponse,
} from 'api/detailApi';
import { useNavigate, useParams } from 'react-router-dom';
import { CommonLayout, NavBar } from 'components/layout';
import { Footer } from 'components/detailPage/Footer/Footer'; // index 오류
import { FooterSpacer, Modal, Tag } from 'components/common';
import {
  StCreatedTime,
  StDetailPageContainer,
  StDetailPageContent,
  StDetailPageHeader,
  StDetailTitle,
  StEditButtonWrapper,
  StNavTitle,
  StTagWrapper,
  StVideoPlayerBox,
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
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isDeleteDetailModalOpen, setIsDeleteDetailModalOpen] = useState(false);
  const [isDeleteCompleteModalOpen, setIsDeleteCompleteModalOpen] =
    useState(false);
  const setCommentCount = useSetRecoilState(commentCountAtom);
  const navigate = useNavigate();
  const defaultAddress = '서울특별시 마포구 와우산로 94'; //정보가 없을시 기본 주소

  //리뷰 아이디 없이 접근시 홈으로 이동
  const { reviewId } = useParams<{ reviewId: string }>();
  if (!reviewId) {
    alert('리뷰 아이디가 없습니다.');
    window.location.href = '/';
    throw new Error('Review ID is missing');
  }

  //유저정보조회 및 업데이트
  const { data: userData } = useVerifyUser(true);
  const userState = useRecoilValue(userProfileSelector); //업데이트 후 조회
  useEffect(() => {
    console.log('current user state: ', userState);
    if (userData) {
      console.log('useVerifyUser data: ', userData);
    }
  }, [userState]);

  //리뷰 상세 조회
  const { data } = useQuery<ReviewDetailResponse, Error>({
    queryKey: ['reviewDetail', reviewId],
    queryFn: () => getReviewDetail(reviewId),
    enabled: !!reviewId,
    onSuccess: (data) => {
      console.log(data);
      setCommentCount(data.commentCnt); // Recoil 댓글 개수를 설정
    },
  });

  //
  const deleteDetail = useMutation({
    mutationFn: () => deleteReviewDetail(reviewId),
    onSuccess: () => {
      setIsDeleteCompleteModalOpen(true);
    },
    onError: (error) => {
      console.log(error);
      setIsDeleteDetailModalOpen(false);
      alert('삭제에 실패했습니다.');
    },
  });
  const handleDeleteDetail = () => {
    deleteDetail.mutate();
  };

  const onEditClickHandler = () => {
    if (!data) {
      return;
    }
    navigate(`/write/${data.id}`, { state: { reviewId: data.id } });
  };

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
              btnLeft={'back'}
              btnRight={'map'}
              onClickRight={() => setIsMapOpen(true)}
            >
              {data && <StNavTitle>{data.roadName}</StNavTitle>}
            </NavBar>
          }
          footer={
            data && (
              <Footer
                reviewId={reviewId}
                likeCnt={data.likeCnt}
                isLiked={data.likebool}
              ></Footer>
            )
          }
          backgroundColor="#FFF"
        >
          <StDetailPageContainer>
            {data && (
              <>
                <button onClick={onEditClickHandler}>임시</button>
                <StDetailPageHeader>
                  <img
                    src={data.profileImgUrl || noUser}
                    alt={`${data.nickname}의 프로필사진`}
                  />
                  <span className="nickname">{data.nickname}</span>
                  <StCreatedTime>{timeAgo(data.createdAt)}</StCreatedTime>
                  {userData?.nickname === data.nickname && (
                    <StEditButtonWrapper>
                      <button className="left" onClick={onEditClickHandler}>
                        수정
                      </button>
                      <div className="divider">|</div>
                      <button
                        className="right"
                        onClick={() => setIsDeleteDetailModalOpen(true)}
                      >
                        삭제
                      </button>
                    </StEditButtonWrapper>
                  )}
                </StDetailPageHeader>
                <StDetailTitle>{data.title || '제목없음'}</StDetailTitle>
                <StDetailPageContent>
                  <img
                    className="detailimg"
                    src={data.mainImgUrl || noImage}
                    alt={`${data.address}의 메인 사진`}
                  />
                  {data.subImgUrl.map((img, index) =>
                    img !== '' ? (
                      <img
                        key={index}
                        src={img}
                        alt={`${data.address}의 ${index}번째 서브 사진`}
                      />
                    ) : null
                  )}

                  {data.videoUrl && (
                    <StVideoPlayerBox>
                      {/* <VideoPlayer videoUrl={data.videoUrl} /> */}
                      <video
                        controls
                        width={'100%'}
                        height={'100%'}
                        src={data.videoUrl}
                        aria-label={`${data.address}의 비디오`}
                      />
                    </StVideoPlayerBox>
                  )}

                  <p className="content" aria-label="본문">
                    {data.content}
                  </p>
                  <StTagWrapper>
                    {data.tag.map((tag) => (
                      <Tag
                        key={tag.id}
                        text={tag.name}
                        isHoverEnabled={false}
                        isSelected={true}
                      />
                    ))}
                  </StTagWrapper>
                  <FooterSpacer />
                  <Modal
                    isOpen={isDeleteDetailModalOpen}
                    onSubmitText="삭제"
                    title="삭제"
                    firstLine="삭제된 글은 복구할 수 없습니다."
                    secondLine="삭제하시겠습니까?"
                    onSubmitHandler={() => handleDeleteDetail()}
                    onCloseHandler={() => setIsDeleteDetailModalOpen(false)}
                  />
                  <Modal
                    isOpen={isDeleteCompleteModalOpen}
                    title="완료"
                    firstLine="삭제가 완료되었습니다."
                    onCloseHandler={() => navigate('/')}
                  />
                </StDetailPageContent>
              </>
            )}
          </StDetailPageContainer>
        </CommonLayout>
      )}
    </>
  );
};
