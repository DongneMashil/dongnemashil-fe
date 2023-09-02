import { styled } from 'styled-components';

export const StFooterContatiner = styled.footer<{ $isCommentOpen: boolean }>`
  position: fixed;
  bottom: 0;
  width: 100%;

  z-index: 100;
  border-radius: 0.875rem 0.875rem 0rem 0rem;

  background-color: #fff;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  height: ${(props) => (props.$isCommentOpen ? '650px' : '50px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  transition: all 0.4s;
  @media (max-height: 850px) {
    height: ${(props) => (props.$isCommentOpen ? '75vh' : '50px')};
  }
`;

export const StFooterButtonWrapper = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 10px;
  width: 100%;
  max-width: 768px; //theme프로바이더로 빼기

  .openWrapper {
    height: 50px;
    display: flex;
    align-items: center;
  }
`;
export const StLike = styled.div`
  gap: 0.5rem;
  display: flex;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;
`;

export const StComment = styled.div`
  margin-left: 2rem;
  margin-right: auto;
  gap: 0.5rem;
  display: flex;
  align-items: center;
  padding-right: 10px;
  cursor: pointer;
  .CommentIcon {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
export const StFooterCommentSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  height: 100%;
  padding: 10px 10px;
  border-top: 1px solid #e9e9e9;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
