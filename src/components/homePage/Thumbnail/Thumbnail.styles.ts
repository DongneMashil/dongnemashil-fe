import { theme } from 'style/theme';
import styled, { css } from 'styled-components';

export const StThumbnail = styled.div`
  display: flex;
  flex-direction: column;

  padding: 26px 0 8px;
  border-bottom: 1px solid ${theme.whiteGrayColor};
`;

export const StThumbnailTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 14px 0 12px;
`;

export const StThumbnailTitleLeft = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 0 10px 3px 8px;
  }
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

export const StThumbnailLike = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;

  font-size: 0.75rem;
  color: ${theme.lightGrayColor};

  svg {
    width: 26px;
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
  $imgRatio?: 'LongerHeight' | 'LongerWidth' | null;
}>`
  ${(props) =>
    props.$imgRatio === 'LongerHeight'
      ? LongerHight
      : props.$imgRatio === 'LongerWidth'
      ? LongerWidth
      : null}

  width: 100%;
  border-radius: 10px;
  overflow: hidden;
`;
