import React from 'react';
import {
  StSkeletonLikeCnt,
  StSkeletonProfileImg,
  StSkeletonSpan,
  StSkeletonThumbnail,
  StSkeletonThumbnailLike,
  StSkeletonThumbnailTitle,
  StSkeletonThumbnailTitleLeft,
  StSkeletonThumnailMain,
  StSkeletonTitleText,
} from './Skeleton.styles';
import { ReactComponent as Heart } from 'assets/icons/Heart.svg';

export const Skeleton = () => {
  return (
    <StSkeletonThumbnail>
      <StSkeletonThumnailMain />
      <StSkeletonThumbnailTitle>
        <StSkeletonThumbnailTitleLeft>
          <StSkeletonProfileImg />
          <StSkeletonTitleText>
            <StSkeletonSpan />
            <StSkeletonSpan />
          </StSkeletonTitleText>
        </StSkeletonThumbnailTitleLeft>
        <StSkeletonThumbnailLike>
          <Heart /> <StSkeletonLikeCnt />
        </StSkeletonThumbnailLike>
      </StSkeletonThumbnailTitle>
    </StSkeletonThumbnail>
  );
};

export default Skeleton;
