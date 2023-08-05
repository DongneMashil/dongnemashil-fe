import React from 'react';
import { StThumbnail } from './Thumbnail.styles';

interface ThumbnailProps {
  road_name: string;
  img_url: string;
  tag: string[];
  likeCnt: string;
}

export const Thumbnail = ({
  road_name,
  img_url,
  tag,
  likeCnt,
}: ThumbnailProps) => {
  return (
    <StThumbnail>
      <img src={img_url} />
      <span>{road_name}</span>
      <span>하트</span>
      <span>{likeCnt}</span>
      <span>날씨가 좋아 생각 정리 겸 산책에 나갔다.</span>
      <span>{tag}</span>
    </StThumbnail>
  );
};
