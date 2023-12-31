import React, { useEffect, useState, Suspense, useLayoutEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteReviewDetail,
  getReviewDetail,
  ReviewDetailResponse,
} from 'api/detailApi';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as DongDong } from 'assets/logo/DongDong.svg';
import { NavBar } from 'components/layout';
import { Footer } from 'components/detailPage';
import { FooterSpacer, Tag } from 'components/common';

const Modal = React.lazy(() => import('components/common/Modal/Modal'));
const ImageModal = React.lazy(
  () => import('components/common/ImageModal/ImageModal')
);
import {
  StCreatedTime,
  StDetailPageContainer,
  StDetailPageContent,
  StDetailPageHeader,
  StDetailPageLayout,
  StDetailTitle,
  StEditButtonWrapper,
  StEmptyContent,
  StMapBox,
  StNavTitle,
  StTagWrapper,
} from './DetailPage.styles';
import noUser from 'assets/images/NoUser.jpg';
import timeAgo from 'utils/timeAgo';
import { useSetRecoilState } from 'recoil';
import { useUpdateUserInfo } from 'hooks';
import { DetailMap } from 'components/detailPage';
import { commentCountAtom } from 'recoil/commentCount/commentCountAtom';
import { MasonryGrid } from '@egjs/react-grid';
import { MasonryGridOptions } from '@egjs/grid';

export const DetailPage = () => {
  const [isDeleteDetailModalOpen, setIsDeleteDetailModalOpen] = useState(false);
  const [isDeleteCompleteModalOpen, setIsDeleteCompleteModalOpen] =
    useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const setCommentCount = useSetRecoilState(commentCountAtom);
  const navigate = useNavigate();
  const [columns, setColumns] = useState(2);
  const defaultAddress = '서울특별시 마포구 와우산로 94'; //정보가 없을시 기본 주소

  //리뷰 아이디 없이 접근시 홈으로 이동
  const { reviewId } = useParams<{ reviewId: string }>();
  if (!reviewId) {
    window.location.href = '/';
    throw new Error('Review ID is missing');
  }

  //유저정보조회 및 업데이트
  const { data: userData } = useUpdateUserInfo();

  //리뷰 상세 조회
  const { data, isError } = useQuery<ReviewDetailResponse, Error>({
    queryKey: ['reviewDetail', reviewId],
    queryFn: () => getReviewDetail(reviewId),
    enabled: !!reviewId,
    onSuccess: (data) => {
      setCommentCount(data.commentCnt); // Recoil 댓글 개수를 설정
    },
  });

  //리뷰 삭제
  const deleteDetail = useMutation({
    mutationFn: () => deleteReviewDetail(reviewId),
    onSuccess: () => {
      setIsDeleteCompleteModalOpen(true);
    },
    onError: () => {
      setIsDeleteDetailModalOpen(false);
      setIsErrorModalOpen(true);
    },
  });
  const handleDeleteDetail = () => {
    deleteDetail.mutate();
  };

  const onEditClickHandler = () => {
    if (!data) {
      return;
    }
    navigate(`/write`, { state: { reviewId: data.id } });
  };
  //지도 설정
  const initMapHandler = (
    map: kakao.maps.Map,
    setMapCenterByAddress: (address: string, map: kakao.maps.Map) => void
  ) => {
    if (data) {
      setMapCenterByAddress(data.address, map);
    } else {
      setMapCenterByAddress(defaultAddress, map);
    }
  };

  //창 크기에 따른 MasonryGrid 컬럼 설정
  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  const masonryGridOptions: MasonryGridOptions = {
    column: columns,
    gap: 14,
    defaultDirection: 'end',
    align: 'stretch',
  };

  //이미지 srcset 설정
  const [mainImageUrl, setMainImageUrl] = useState<(string | null)[]>([]);
  const [subImgUrl, setSubImgUrl] = useState<(string | null)[][]>([]);
  useEffect(() => {
    if (data) {
      setMainImageUrl([
        data.mainImgUrl,
        data.middleMainImgUrl,
        data.smallMainImgUrl,
      ]);
      if (data.subImgUrl && data.subImgUrl[0] !== '') {
        const subImgUrlArr = data.subImgUrl.map((img, index) => {
          return [img, data.middleSubImgUrl[index], data.smallSubImgUrl[index]];
        });
        setSubImgUrl(subImgUrlArr);
      }
    }
  }, [data]);
  //이미지 모달
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const onClickImage = (imgSrc: string) => {
    setImageSrc(imgSrc);
    setIsImageModalOpen(true);
  };

  return (
    <>
      <StDetailPageLayout>
        <NavBar btnLeft={'back'} btnRight={'mypage'}>
          {data && <StNavTitle>{data.roadName}</StNavTitle>}
        </NavBar>
        <StDetailPageContainer>
          {isError && (
            <StEmptyContent>
              <button onClick={() => navigate('/')}>
                <DongDong className="dongdong" />
              </button>
              <p className="text">게시글이 존재하지 않습니다!</p>
              <p className="text">동동이를 누르면 홈으로 돌아갑니다</p>
            </StEmptyContent>
          )}
          {data && (
            <>
              <StDetailPageHeader>
                <img
                  src={data.profileImgUrl || noUser}
                  alt={`${data.nickname}의 프로필사진`}
                  onClick={() => navigate(`/userpage/${data.nickname}`)}
                />
                <button
                  className="nickname"
                  onClick={() => navigate(`/userpage/${data.nickname}`)}
                >
                  {data.nickname}
                </button>
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
                <MasonryGrid {...masonryGridOptions}>
                  {/* <StContentGridBox> */}
                  <img
                    fetchpriority="high"
                    src={mainImageUrl[0]!}
                    srcSet={`${mainImageUrl[0]} 1440w, ${mainImageUrl[1]} 768w, ${mainImageUrl[2]} 360w`}
                    sizes={`(min-width:768px) 360px, (min-width:500px) 768px, 360px`}
                    alt={`${data.address}의 메인 사진`}
                    onClick={() => onClickImage(mainImageUrl[0]!)}
                    className={
                      data.subImgUrl[0] !== '' || data.videoUrl
                        ? 'notSingle'
                        : 'isSingle'
                    }
                  />
                  {subImgUrl &&
                    subImgUrl.map((img, index) => (
                      <img
                        fetchpriority="high"
                        key={index}
                        src={img[0]!}
                        srcSet={`${img[0]} 1440w, ${img[1]} 768w, ${img[2]} 360w`}
                        sizes={`(min-width:768px) 360px, (min-width:500px) 768px, 360px`}
                        alt={`${data.address}의 ${index}번째 서브 사진`}
                        onClick={() => onClickImage(img[0]!)}
                      />
                    ))}
                  {data.videoUrl && (
                    <video
                      controls
                      width={'100%'}
                      src={data.videoUrl}
                      aria-label={`${data.address}의 비디오`}
                    />
                  )}
                </MasonryGrid>
                {/* </StContentGridBox> */}

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
                <StMapBox>
                  <DetailMap
                    height="100%"
                    width="100%"
                    initMap={initMapHandler}
                  />
                </StMapBox>

                <FooterSpacer />
                <Suspense fallback={<div>loading...</div>}>
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
                  <Modal
                    isOpen={isErrorModalOpen}
                    title="알림"
                    firstLine="삭제에 실패했습니다. 다시 로그인 해주세요!"
                    onCloseHandler={() => setIsErrorModalOpen(false)}
                    onSubmitHandler={() => navigate('/login')}
                    onSubmitText="로그인"
                  />
                  <ImageModal
                    isOpen={isImageModalOpen}
                    onCloseHandler={() => setIsImageModalOpen(false)}
                    imageSrc={imageSrc}
                  />
                </Suspense>
              </StDetailPageContent>
            </>
          )}
        </StDetailPageContainer>
        {data && (
          <Footer
            reviewId={reviewId}
            likeCnt={data.likeCnt}
            isLiked={data.likebool}
          ></Footer>
        )}
      </StDetailPageLayout>
    </>
  );
};
