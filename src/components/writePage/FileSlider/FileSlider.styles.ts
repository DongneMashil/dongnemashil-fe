import { styled } from 'styled-components';

interface StPlusButtonProps {
  disabled?: boolean;
}

export const StSlideContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  min-height: 200px;
  width: 85%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  @media ${(props) => props.theme.device.desktop} {
    width: 100%;
    padding: 0;
    padding-left: 1rem;
    margin: 0;
    overflow-x: auto;
    white-space: nowrap;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
    & > * {
      flex-shrink: 0;
      margin-right: 0.75rem;
    }

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export const StCenteredBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 100%;
  padding: 5rem;
  @media ${(props) => props.theme.device.desktop} {
    margin: auto;
    width: 46%;
  }
`;

export const StPlusButton = styled.div<StPlusButtonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    `
        opacity: 0.5;
        pointer-events: none;
        cursor: not-allowed;
    `}

  & > p {
    color: #9a7b9a;
    text-align: center;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const StImageContainer = styled.div`
  position: relative;
  width: 90%;
  height: 100%;
  @media ${(props) => props.theme.device.desktop} {
    width: 46%;
  }
`;

export const StCoverImageButton = styled.button<{ isActive: boolean }>`
  width: 2.4rem;
  height: 2.4rem;
  position: absolute;
  top: 0.69rem;
  left: 0.69rem;
  background: ${(props) =>
    props.isActive ? '#9A7B9A' : 'rgba(154, 123, 154, 0.35)'};
  color: white;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  border: ${(props) => (props.isActive ? 'none' : '1.5px solid white')};
  border-radius: 100%;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

export const StDelete = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  position: absolute;
  top: 1.19rem;
  right: 0.75rem;
  background-color: rgba(154, 123, 154, 0.35);
  border-radius: 100%;
  border: 1.5px solid white;
`;
