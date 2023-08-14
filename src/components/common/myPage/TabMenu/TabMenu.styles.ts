import { styled } from 'styled-components';

export const StReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  margin-bottom: 1rem;
  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 0.875rem;
  }
  .contentWrapper {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.7rem;
    gap: 0.2rem;
    .title {
      font-size: 1rem;
      font-weight: 600;
    }
    .date {
      font-size: 0.875rem;
      font-weight: 400;
      color: #828282;
    }
  }
`;

export const StTabContentBox = styled.div`
  width: 100%;

  background-color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.03);
  border-radius: 0.875rem;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-items: center;
  gap: 5px;

  @media (min-width: 300px) {
    grid-template-columns: repeat(2, 1fr);
  }

  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 0.875rem;
  }
`;

export const StTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const StTabButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 0 1rem;
  margin: 0.5rem;
`;
export const StTabButtonBox = styled.div`
  display: flex;
`;
export const StCounter = styled.div`
  display: flex;
  align-items: center;

  color: rgb(131, 131, 131);
  font-family: Pretendard;
  font-size: 0.875rem;

  font-weight: 600;
`;
