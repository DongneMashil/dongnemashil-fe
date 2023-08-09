import React from 'react';
import { StThumbnail } from './Thumbnail.styles';
import { Span } from '../Span/Span';
import { useNavigate } from 'react-router-dom';
import { ReviewsList } from 'api/reviewsApi';
import { user } from 'assets/user';

export const Thumbnail = ({
  id,
  roadName,
  mainImgUrl,
  videoUrl,
  profileImgUrl,
  likeCnt,
  likebool,
}: ReviewsList) => {
  const navigate = useNavigate();

  const onClickThumbnail = () => {
    navigate(`/review/${id}`);
  };

  return (
    <StThumbnail onClick={onClickThumbnail}>
      <div>
        <Span size={'title'}>
          {profileImgUrl ? <img src={profileImgUrl} /> : <img src={user} />}
          <strong>{roadName}</strong>에서
        </Span>
        <Span>
          {likebool}❤️ {likeCnt}
        </Span>
      </div>
      {mainImgUrl ? (
        <img src={mainImgUrl} />
      ) : (
        videoUrl && (
          <video>
            <source src={videoUrl} type="video/mp4" />
          </video>
        )
      )}
    </StThumbnail>
  );
};
