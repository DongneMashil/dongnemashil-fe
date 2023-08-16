import { styled } from 'styled-components';

export const StNavTitle = styled.h1`
  max-width: 70vw;
  font-size: 1.2rem;
  font-weight: bold;
  white-space: nowrap; // 한줄로
  overflow: hidden; // 넘치면 숨김
  text-overflow: ellipsis; //넘치면 ...

  direction: rtl; //...을 앞에 붙임
`;

export const StTagWrapper = styled.ul`
  width: 100%;
  height: fit-content;
  // padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0;
  align-items: center;
`;

export const StDetailPageContainer = styled.div`
  width: 100%;
  // height: 100%;  백그라운드 색상 때문에 높이를 100%로 주면 안됨
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1rem;
`;

export const StDetailTitle = styled.h1`
  margin-top: 0.5rem;
  font-size: 2rem;
`;
export const StDetailPageHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e5e5;
  margin: 1rem 0;
  .nickname {
    margin-left: 0.5rem;
    margin-right: auto;
    color: var(--textcolor, #333);
    font-family: Pretendard;
    font-size: 0.875rem;
    font-weight: 400;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

export const StCreatedTime = styled.div`
  color: #8e8e8e;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
`;

export const StDetailPageContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.3rem;
  .detailimg {
    width: 100%;
    object-fit: contain;
  }
  p {
    margin: 1rem 0.5rem 1rem 0.5rem;

    height: fit-content;
    font-size: 16px;
    line-height: 1.5;
  }
`;

export const StVideoPlayerBox = styled.div`
  width: 100%;
  height: 100%;
`;
