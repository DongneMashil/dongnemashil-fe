import React, { useEffect, useState } from 'react';
import { Thumbnail, ThumbnailProps } from '../Thumbnail/Thumbnail';
import { StThumbnailWrapper } from './ThumbnailWrapper.styles';

export const ThumbnailWrapper = () => {
  const [data, setData] = useState<ThumbnailProps[]>([]);

  useEffect(() => {
    fetch('/reviews')
      .then((response) => response.json())
      .then((result) => setData(result.contents))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  console.log(data);

  return (
    <StThumbnailWrapper>
      {data.map((post) => (
        <Thumbnail
          key={post.id}
          id={post.id}
          road_name={post.road_name}
          img_url={post.img_url}
          likeCnt={post.likeCnt}
        />
      ))}
    </StThumbnailWrapper>
  );
};
