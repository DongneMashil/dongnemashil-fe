import { theme } from 'style/theme';
import { styled } from 'styled-components';

export const StReviewsContainer = styled.div`
  width: 100%;
  padding: 0 15px;
  border-radius: 14px 14px 0 0;
  background-color: ${theme.whiteColor};
  box-shadow: 0px -6px 6px 0px rgba(0, 0, 0, 0.03);

  @media ${theme.device.desktop} {
    max-width: 768px;
    margin: 0 auto;
    border-radius: 14px;
  }
`;

export const StTarget = styled.div`
  height: 1px;
`;

export const StTopWrapper = styled.div`
  display: flex;
  padding-top: 7.5px;
  padding-left: 9px;

  & span {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    color: ${theme.lightGrayColor};
    flex: 1;
    padding: 8.5px 0;

    & strong {
      font-weight: 600;
    }
  }
`;

export const StSort = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  flex: 1;
  color: ${theme.lightGrayColor};
`;

export const StLine = styled.div`
  background: ${theme.whiteGrayColor};
  height: 10px;
  margin-left: 2px;
  margin-right: 2px;
  width: 1px;
`;

export const StNoReviews = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30vh;
  margin-bottom: 41vh;
`;
