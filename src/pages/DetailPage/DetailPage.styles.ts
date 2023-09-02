import { theme } from 'style/theme';
import { styled } from 'styled-components';

export const StNavTitle = styled.h1`
  max-width: 70vw;
  font-size: 1.2rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  background: ${theme.windowBackgroundColor};
  padding: 1rem;
  @media (min-width: ${theme.size.tablet}) {
    ${theme.floatingBox}
    padding:1.5rem;
    top: 2rem;
  }
  ${theme.responsiveContainer}
`;

export const StDetailTitle = styled.h1`
  margin-top: 0.5rem;
  font-size: 2rem;
  border-bottom: 1px solid #e5e5e5;
  margin: 1rem 0;
  padding-bottom: 9px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const StDetailPageHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 0.5rem;
  gap: 0.5rem;
  .nickname {
    background: none;
    color: var(--textcolor, #333);
    font-family: Pretendard;
    font-size: 0.875rem;
    font-weight: 400;
    cursor: pointer;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const StCreatedTime = styled.div`
  margin-left: 0.5rem;
  margin-right: auto;
  color: #8e8e8e;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  // margin-top: 0.5rem;
`;

export const StDetailPageContent = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.3rem;

  .content {
    margin: 1rem 0rem;

    height: fit-content;
    font-size: 16px;
    line-height: 1.5;
    border-top: 1px solid #e5e5e5;
    padding-top: 2rem;
    padding-bottom: 1rem;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
  }
  img {
    cursor: pointer;
  }
  @media (min-width: ${theme.size.tablet}) {
    .isSingle {
      transform: translateX(50%);
    }
  }
`;

export const StVideoPlayerBox = styled.div`
  width: 100%;
  height: 100%;
`;

export const StEditButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  button {
    color: #8c8c8c;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background: none;
  }

  .divider {
    color: #8c8c8c;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin: 5px;
  }
  section {
    display: flex;
    align-items: center;
  }
`;

export const StContentGridBox = styled.div`
  // width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-auto-rows: 1fr;

  img,
  video {
    height: fit-content;
    width: 100%; // 모바일 기본값으로 100% 폭 설정
    margin: 0.5rem 0; // 상하 간격 설정

    // 태블릿 뷰
    @media (min-width: 640px) {
      width: calc(50% - 1rem); // 2개의 열로 나누기 위해 50% 폭 지정
      margin: 0.5rem;
    }
  }
`;

export const StDetailPageLayout = styled.div`
  ${theme.responsiveLayout}
  background: #F7F7F7;
  // background:#ffffff;
  @media (max-width: ${theme.size.tablet}) {
    background: #ffffff;
  }
  min-height: 100vh;
`;

export const StMapBox = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  margin: 2rem auto;
`;

export const StEmptyContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin: 3rem 0;

  .dongdong {
    margin-top: 1rem;
    height: 13rem;
    @media (max-height: 550px) {
      height: 8rem;
    }
    cursor: pointer;
    opacity: 0.1;
  }
  .text {
    margin: 0.5rem 0;
    color: #8c8c8c;
    text-align: center;
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background: none;
    opacity: 0.6;
  }
`;
