import React from 'react';
import { StThumbnail } from './Thumbnail.styles';
import { Span } from '../Span/Span';

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
      <div>
        <Span size={'title'}>{road_name}</Span>
        <Span>하트 {likeCnt}</Span>
        <Span>{tag}</Span>
      </div>
    </StThumbnail>
  );
};
