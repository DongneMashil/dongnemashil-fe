import { theme } from 'style/theme';
import styled, { css } from 'styled-components';

export const StThumbnail = styled.li`
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
  cursor: pointer;
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

const longerHight = css`
  position: relative;

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  & img {
    width: 100%;
    position: absolute;
    transform: translateY(-10%);
  }
`;

const longerWidth = css`
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StThumnailMain = styled.div<{
  $imgRatio?: 'longerHeight' | 'longerWidth' | null;
}>`
  ${(props) =>
    props.$imgRatio === 'longerHeight'
      ? longerHight
      : props.$imgRatio === 'longerWidth'
      ? longerWidth
      : null}

  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`;
