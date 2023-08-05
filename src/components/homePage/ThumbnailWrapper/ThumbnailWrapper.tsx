import React from 'react';
import { Thumbnail } from '../Thumbnail/Thumbnail';
import { test1, test2, test3 } from 'assets/test';
import { StThumbnailWrapper } from './ThumbnailWrapper.styles';

export const ThumbnailWrapper = () => {
  const result = [
    {
      id: 1,
      road_name: '서울숲로',
      img_url: test1,
      tag: ['반려동물과 함께', '탁 트인 풍경', '자연과 함께'],
      likeCnt: '1354',
    },
    {
      id: 2,
      road_name: '한강로',
      img_url: test2,
      tag: ['반려동물과 함께', '탁 트인 풍경', '자연과 함께'],
      likeCnt: '1354',
    },
    {
      id: 3,
      road_name: '한강로',
      img_url: test3,
      tag: ['반려동물과 함께', '탁 트인 풍경', '자연과 함께'],
      likeCnt: '1354',
    },
    {
      id: 4,
      road_name: '한강로',
      img_url: test1,
      tag: ['반려동물과 함께', '탁 트인 풍경', '자연과 함께'],
      likeCnt: '1354',
    },
    {
      id: 5,
      road_name: '한강로',
      img_url: test2,
      tag: ['반려동물과 함께', '탁 트인 풍경', '자연과 함께'],
      likeCnt: '1354',
    },
    {
      id: 6,
      road_name: '한강로',
      img_url: test3,
      tag: ['반려동물과 함께', '탁 트인 풍경', '자연과 함께'],
      likeCnt: '1354',
    },
    {
      id: 7,
      road_name: '한강로',
      img_url: test1,
      tag: ['반려동물과 함께', '탁 트인 풍경', '자연과 함께'],
      likeCnt: '1354',
    },
  ];

  return (
    <StThumbnailWrapper>
      {result.map((post) => (
        <Thumbnail
          key={post.id}
          id={post.id}
          road_name={post.road_name}
          img_url={post.img_url}
          tag={post.tag}
          likeCnt={post.likeCnt}
        />
      ))}
    </StThumbnailWrapper>
  );
};
