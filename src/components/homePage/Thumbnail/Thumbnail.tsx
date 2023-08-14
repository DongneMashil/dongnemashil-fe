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
import noUser from 'assets/images/NoUser.gif';
import { numberWithCommas } from 'utils';

export const Thumbnail = ({
  id,
  roadName,
  mainImgUrl,
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
        ) : null}
      </StThumnailMain>
      <StThumbnailTitle>
        <StThumbnailTitleLeft>
          <img src={profileImgUrl || noUser} alt="프로필 이미지" />
          <StTitleText>
            <Span size={'title'}>
              <strong>{roadName}</strong>
            </Span>
            <Span size={'small'}>2시간 전 (서버 작업 대기)</Span>
          </StTitleText>
        </StThumbnailTitleLeft>
        <StThumbnailLike onClick={toggleLikeHandler}>
          {isLiked ? <FilledHeart /> : <Heart />} {numberWithCommas(likeCnt)}
        </StThumbnailLike>
      </StThumbnailTitle>
    </StThumbnail>
  );
};
