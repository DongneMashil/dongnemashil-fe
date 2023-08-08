import React from 'react';
import { StThumbnail } from './Thumbnail.styles';
import { Span } from '../Span/Span';
import { useNavigate } from 'react-router-dom';

export interface ThumbnailProps {
  id: number;
  road_name: string;
  img_url: string;
  likeCnt: string;
}

export const Thumbnail = ({
  id,
  road_name,
  img_url,
  likeCnt,
}: ThumbnailProps) => {
  const navigate = useNavigate();

  const onClickThumbnail = () => {
    navigate(`/review/${id}`);
  };

  return (
    <StThumbnail onClick={onClickThumbnail}>
      <div>
        <Span size={'title'}>
          👾 <strong>{road_name}</strong>에서
        </Span>
        <Span>❤️ {likeCnt}</Span>
      </div>
      <img src={img_url} />
    </StThumbnail>
  );
};
