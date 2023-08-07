import React from 'react';
import { StThumbnail } from './Thumbnail.styles';
import { Span } from '../Span/Span';
import { useNavigate } from 'react-router-dom';
import { ReviewsList } from 'api/reviewsApi';

export const Thumbnail = ({
  id,
  roadName,
  img_url,
  likeCnt,
  tag,
  profileImg_url,
}: ReviewsList) => {
  const navigate = useNavigate();

  const onClickThumbnail = () => {
    navigate(`/review/${id}`);
  };

  return (
    <StThumbnail onClick={onClickThumbnail}>
      <div>
        <Span size={'title'}>
          <img src={profileImg_url} />
          <strong>{roadName}</strong>에서
        </Span>
        <Span>❤️ {likeCnt}</Span>
        {tag}
      </div>
      <img src={img_url} />
    </StThumbnail>
  );
};
