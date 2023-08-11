import React, { useRef, useState } from 'react';
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
  const [imgRatio, setImgRatio] = useState<
    'LongerHeight' | 'LongerWidth' | null
  >(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const onClickThumbnail = () => {
    navigate(`/review/${id}`);
  };

  const handleImageLoad = () => {
    if (imageRef.current) {
      const imageWidth = imageRef.current.naturalWidth;
      const imageHeight = imageRef.current.naturalHeight;

      if (imageWidth < imageHeight) {
        setImgRatio('LongerHeight');
      } else {
        setImgRatio('LongerWidth');
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
        {mainImgUrl ? (
          <img ref={imageRef} src={mainImgUrl} onLoad={handleImageLoad} />
        ) : videoUrl ? (
          <video>
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : null}
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
