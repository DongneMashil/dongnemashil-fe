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

export const StDetailPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1rem;
`;
export const StDetailPageHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e5e5;
  margin: 1rem 0;
  h4 {
    font-size: 2rem;
    margin-left: 1rem;
    margin-right: auto;
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
