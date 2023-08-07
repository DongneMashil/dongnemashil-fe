import { styled } from 'styled-components';

export const StNavTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
`;
export const StTagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;
interface StDetailPageContainerProps {
  img: string;
}

export const StDetailPageContainer = styled.div<StDetailPageContainerProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1rem;
`;
export const StDetailPageHeader = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e5e5;
  h4 {
    margin-left: 1rem;
    margin-right: auto;
  }
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

export const StDetailPageInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  h3 {
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
  }
  h6 {
    font-size: 16px;
  }
`;

export const StDetailPageContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.3rem;
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  p {
    margin: 1rem 0.5rem 1rem 0.5rem;

    height: fit-content;
    font-size: 16px;
    line-height: 1.5;
  }
`;
