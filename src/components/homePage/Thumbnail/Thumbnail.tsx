import React from 'react';
import { StThumbnail } from './Thumbnail.styles';
import { Span } from '../Span/Span';
import { useNavigate } from 'react-router-dom';

export interface ThumbnailProps {
  id: number;
  road_name: string;
  img_url: string;
  tag: string[];
  likeCnt: string;
}

export const Thumbnail = ({
  id,
  road_name,
  img_url,
  tag,
  likeCnt,
}: ThumbnailProps) => {
  const navigate = useNavigate();

  const onClickThumbnail = () => {
    navigate(`/review/${id}`);
  };

  return (
    <StThumbnail onClick={onClickThumbnail}>
      <img src={img_url} />
      <div>
        <Span size={'title'}>{road_name}</Span>
        <Span>좋아요 {likeCnt}</Span>
        <Span>{tag}</Span>
      </div>
    </StThumbnail>
  );
};
