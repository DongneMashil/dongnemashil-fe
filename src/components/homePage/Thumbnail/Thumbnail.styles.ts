import { theme } from 'style/theme';
import styled, { css } from 'styled-components';

export const StThumbnail = styled.div`
  display: flex;
  flex-direction: column;

  padding: 26px 0 8px;
  border-bottom: 1px solid ${theme.lightGrayColor};
`;

export const StThumbnailTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 130px;
  margin: 10px 0;

  & div {
    & img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
`;

export const StThumbnailTitleLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const StTitleText = styled.div`
  display: flex;
  flex-direction: column;
`;

const LongerHight = css`
  position: relative;

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  & img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }
`;

const LongerWidth = css`
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
`;

export const StThumnailMain = styled.div<{
  $imgRatio?: 'LongerHight' | 'LongerWidth' | null;
}>`
  ${(props) =>
    props.$imgRatio === 'LongerHight'
      ? LongerHight
      : props.$imgRatio === 'LongerWidth'
      ? LongerWidth
      : null}

  width: 100%;
  border-radius: 10px;
  overflow: hidden;
`;
