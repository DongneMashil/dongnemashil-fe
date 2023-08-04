import { Button } from 'components/common';
import React from 'react';
import { useNavigate } from 'react-router-dom';
export const PostMapPage = () => {
  const navigate = useNavigate();
  const handleGoHome = (): void => {
    navigate('/');
  };

  const handleGoNextPage = (): void => {
    navigate('/post');
  };

  return (
    <>
      <div>
        <Button label="메인으로" onclick={handleGoHome} />
        <span>좋았던 산책 지점을 선택해주세요</span>
      </div>
      <div>지도가 들어갈 부분</div>
      <div>
        <div>위치 들어갈 div</div>
        <Button label="다음버튼" onclick={handleGoNextPage} />
      </div>
    </>
  );
};
