import React from 'react';
import {
  StThumbnail,
  StThumbnailTitle,
  StThumbnailTitleLeft,
  StThumnailMain,
  StTitleText,
} from './Thumbnail.styles';
import { Span } from '../Span/Span';
import { useNavigate } from 'react-router-dom';
import { ReviewsList } from 'api/reviewsApi';
import { user } from 'assets/user';
import { ReactComponent as Heart } from 'assets/icons/Heart.svg';
import { ReactComponent as FilledHeart } from 'assets/icons/HeartFilled.svg';
import { useLike } from 'hooks';
import { StLike } from 'components/detailPage';

export const Thumbnail = ({
  id,
  roadName,
  mainImgUrl,
  videoUrl,
  profileImgUrl,
  likeCnt: initialLikeCnt,
  likebool: initialIsLiked,
}: ReviewsList) => {
  const navigate = useNavigate();

  const onClickThumbnail = () => {
    navigate(`/review/${id}`);
  };

  const { isLiked, likeCnt, toggleLikeHandler } = useLike({
    reviewId: id.toString(),
    initialIsLiked,
    initialLikeCnt,
  });

  return (
    <StThumbnail>
      <StThumnailMain onClick={onClickThumbnail}>
        {mainImgUrl ? (
          <img src={mainImgUrl} />
        ) : (
          videoUrl && (
            <video>
              <source src={videoUrl} type="video/mp4" />
            </video>
          )
        )}
      </StThumnailMain>
      <StThumbnailTitle>
        <StThumbnailTitleLeft>
          {profileImgUrl ? <img src={profileImgUrl} /> : <img src={user} />}
          <StTitleText>
            <Span size={'title'}>
              <strong>{roadName}</strong>에서
            </Span>
            <Span size={'small'}>2시간 전</Span>
          </StTitleText>
        </StThumbnailTitleLeft>
        <StLike onClick={toggleLikeHandler}>
          {isLiked ? <FilledHeart /> : <Heart />} {likeCnt}
        </StLike>
      </StThumbnailTitle>
    </StThumbnail>
  );
};
