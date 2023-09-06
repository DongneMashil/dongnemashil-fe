import { theme } from 'style/theme';
import styled from 'styled-components';

export const StSkeletonThumbnail = styled.li`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 26px 0 8px;
  border-bottom: 1px solid ${theme.whiteGrayColor};

  &:nth-last-child(1) {
    border-bottom: 0px;
  }

  @media ${theme.device.desktop} {
    &:nth-last-child(2) {
      border-bottom: 0px;
    }
  }
`;

export const StSkeletonThumbnailTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 14px 0 12px;
`;

export const StSkeletonThumbnailTitleLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const StSkeletonProfileImg = styled.div`
  width: 30px;
  height: 30px;
  background: #f2f2f2;
  border-radius: 50%;
  margin: 0 10px 3px 8px;
`;

export const StSkeletonTitleText = styled.div`
  display: flex;
  flex-direction: column;

  :nth-child(1) {
    width: 100px;
    height: 12px;
    background: #f2f2f2;
    margin-bottom: 8px;
  }

  :nth-child(2) {
    width: 80px;
    height: 8px;
    background: #f2f2f2;
  }
`;

export const StSkeletonSpan = styled.span`
  border-radius: 10px;
  background: #f2f2f2;
`;

export const StSkeletonThumbnailLike = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-left: 10px;

  svg {
    width: 26px;
  }
`;

export const StSkeletonLikeCnt = styled.div`
  width: 20px;
  height: 10px;
  background: #f2f2f2;
  border-radius: 10px;
`;

export const StSkeletonThumnailMain = styled.div`
  width: 100%;
  height: 350px;
  border-radius: 10px;
  background: #f2f2f2;

  @media ${theme.device.desktop} {
    max-width: 362px;
  }
`;
