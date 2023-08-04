import React from 'react';
import { styled } from 'styled-components';
// import {useState} from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { getReviewDetail, ReviewDetail } from 'api/detailApi';
// import { useParams } from 'react-router-dom';
// import { MyFavoriteTags } from 'components/common/Modal/MyFavoriteTags/MyFavoriteTags';
// import { Tag } from 'components/common/Tag/Tag';
// import { Input } from 'components/common';

export const DetailPage = () => {
  // const [isModalOpen, setModalOpen] = useState(false);
  // const { reviewId } = useParams<{ reviewId: string }>();
  // if (!reviewId) {
  //   throw new Error('Review ID is missing');
  // }
  // const { data, isLoading, isError, error } = useQuery<ReviewDetail, Error>({
  //   queryKey: ['reviewDetail', reviewId],
  //   queryFn: () => getReviewDetail(reviewId),
  //   enabled: !!reviewId,
  // });
  const data = {
    id: 1,
    content: '본문본문이요본민잉본문이요본문ㅇ본문',
    img_url:
      'https://images.unsplash.com/photo-1690463230075-ce79152c2c1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    title: '제목이요제목제목제목',
    video_url: null,
    createdAt: '2021-03-21T14:48:00.000Z',
    nickname: '닉네임',
    profileImg_url:
      'https://media.suara.com/suara-partners/semarang/thumbs/336x189/2022/11/22/1-cat-g497210635-1920.jpg',
    address: '서울시 마포구 매봉산로 18',
    comments: [
      {
        comment_id: 1,
        username: '닉네임',
        profile_img:
          'https://media.suara.com/suara-partners/semarang/thumbs/336x189/2022/11/22/1-cat-g497210635-1920.jpg',
        comment: '댓글입니다',
      },
    ],
  };

  return (
    <>
      {/* {isLoading && <div>Loading...</div>}
      {isError && <div>{String(error)}</div>} */}

      <StDetailPageContainer img={data.img_url}>
        <StDetailPageHeader>
          <StDetailPageTitle>{data.title}</StDetailPageTitle>
          <StDetailPageInfo>
            <StDetailPageNickname>{data.nickname}</StDetailPageNickname>
            <StDetailPageCreatedAt>{data.createdAt}</StDetailPageCreatedAt>
          </StDetailPageInfo>
        </StDetailPageHeader>
        <StDetailPageContent>
          <StDetailPageImg src={data.img_url} />
          <StDetailPageText>{data.content}</StDetailPageText>
        </StDetailPageContent>
        <StDetailPageComment>
          <StDetailPageCommentTitle>댓글</StDetailPageCommentTitle>
          <StDetailPageCommentInput>
            <input placeholder="댓글을 입력해주세요" />
          </StDetailPageCommentInput>
          <StDetailPageCommentList>
            {data.comments.map((comment) => (
              <StDetailPageCommentItem key={comment.comment_id}>
                <StDetailPageCommentProfileImg
                  src={comment.profile_img}
                  alt="프로필 이미지"
                />
                <StDetailPageCommentNickname>
                  {comment.username}
                </StDetailPageCommentNickname>
                <StDetailPageCommentContent>
                  {comment.comment}
                </StDetailPageCommentContent>
              </StDetailPageCommentItem>
            ))}
          </StDetailPageCommentList>
        </StDetailPageComment>
      </StDetailPageContainer>
    </>
  );
};
interface StDetailPageContainerProps {
  img: string;
}
// export const StDetailPageContainer = styled.div<StDetailPageContainerProps>`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   background-color: black;
//   z-index: 1;
//   ::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     background-image: ${(props) => `url(${props.img})`};
//     background-size: cover;
//     background-position: center;
//     background-repeat: no-repeat;
//     filter: blur(10px) brightness(0.5);
//     z-index: -1;
//   }
// `;

export const StDetailPageContainer = styled.div<StDetailPageContainerProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1rem;
`;
export const StDetailPageHeader = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StDetailPageTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const StDetailPageInfo = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const StDetailPageNickname = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

export const StDetailPageCreatedAt = styled.div`
  font-size: 16px;
`;

export const StDetailPageContent = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StDetailPageImg = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export const StDetailPageText = styled.div`
  width: 100%;
  height: 100px;
  font-size: 16px;
  line-height: 1.5;
`;

export const StDetailPageComment = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StDetailPageCommentTitle = styled.div`
  width: 100%;
  height: 50px;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StDetailPageCommentInput = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StDetailPageCommentList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StDetailPageCommentItem = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #000;
`;

export const StDetailPageCommentProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const StDetailPageCommentNickname = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

export const StDetailPageCommentContent = styled.div`
  font-size: 16px;
`;
