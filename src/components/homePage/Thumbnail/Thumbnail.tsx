import React, { useRef, useState } from 'react';
import {
  StThumbnail,
  StThumbnailLike,
  StThumbnailTitle,
  StThumbnailTitleLeft,
  StThumnailMain,
  StTitleText,
} from './Thumbnail.styles';
import { Span } from '../Span/Span';
import { useNavigate } from 'react-router-dom';
import { ReviewsList } from 'api/reviewsApi';
import { ReactComponent as Heart } from 'assets/icons/Heart.svg';
import { ReactComponent as FilledHeart } from 'assets/icons/HeartFilled.svg';
import { useLike } from 'hooks';
import noUser from 'assets/images/NoUser.jpg';
import { numberWithCommas } from 'utils';
import timeAgo from 'utils/timeAgo';

export const Thumbnail = ({
  id,
  roadName,
  middleMainImgUrl,
  smallMainImgUrl,
  profileImgUrl,
  nickname,
  createdAt,
  likeCnt: initialLikeCnt,
  likebool: initialIsLiked,
}: ReviewsList) => {
  const navigate = useNavigate();
  const [imgRatio, setImgRatio] = useState<
    'longerHeight' | 'longerWidth' | null
  >(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const onClickThumbnail = () => {
    navigate(`/review/${id}`);
  };

  const onClickWriter = () => {
    navigate(`/userPage/${nickname}`);
  };

  const handleImageLoad = () => {
    if (imageRef.current) {
      const imageWidth = imageRef.current.naturalWidth;
      const imageHeight = imageRef.current.naturalHeight;

      if (imageWidth < imageHeight) {
        setImgRatio('longerHeight');
      } else {
        setImgRatio('longerWidth');
      }
    }
  };

  const { isLiked, likeCnt, toggleLikeHandler } = useLike({
    reviewId: id.toString(),
    initialIsLiked,
    initialLikeCnt,
  });

  return (
    <StThumbnail>
      <StThumnailMain onClick={onClickThumbnail} $imgRatio={imgRatio}>
        {middleMainImgUrl ? (
          <img
            ref={imageRef}
            src={middleMainImgUrl}
            srcSet={`${smallMainImgUrl} x1, ${middleMainImgUrl} x1`}
            onLoad={handleImageLoad}
            alt="썸네일 이미지"
          />
        ) : null}
      </StThumnailMain>
      <StThumbnailTitle>
        <StThumbnailTitleLeft>
          <img
            src={profileImgUrl || noUser}
            alt="프로필 이미지"
            onClick={onClickWriter}
          />
          <StTitleText onClick={onClickThumbnail}>
            <Span size={'title'}>
              <strong>{roadName}</strong>
            </Span>
            <Span size={'small'}>{timeAgo(createdAt)}</Span>
          </StTitleText>
        </StThumbnailTitleLeft>
        <StThumbnailLike onClick={toggleLikeHandler}>
          {isLiked ? <FilledHeart /> : <Heart />} {numberWithCommas(likeCnt)}
        </StThumbnailLike>
      </StThumbnailTitle>
    </StThumbnail>
  );
};
