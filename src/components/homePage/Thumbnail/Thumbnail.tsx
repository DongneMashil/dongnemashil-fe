import React from 'react';
import { StThumbnail, StThumnailMain } from './Thumbnail.styles';
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
      <div>
        <Span size={'title'}>
          {profileImgUrl ? <img src={profileImgUrl} /> : <img src={user} />}
          <strong>{roadName}</strong>에서
        </Span>
        <StLike onClick={toggleLikeHandler}>
          {isLiked ? <FilledHeart /> : <Heart />} {likeCnt}
        </StLike>
      </div>
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
    </StThumbnail>
  );
};
