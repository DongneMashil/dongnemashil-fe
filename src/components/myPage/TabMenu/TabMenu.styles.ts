import { styled } from 'styled-components';

export const StReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.8rem;
  cursor: pointer;

  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 0.875rem;
  }
  .contentWrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.1rem 0.6rem;
    gap: 0.3rem;
    .title {
      font-size: 1rem;
      font-weight: 600;
      //   white-space: nowrap; // 한줄로
      //   overflow: hidden; // 넘치면 숨김
      //   text-overflow: ellipsis; //넘치면 ...

      //   direction: rtl; //...을 앞에 붙임
      //   max-width: 110px;
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
  padding: 10px;

  margin-bottom: 1rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.03);
  border-radius: 0.875rem;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  //   justify-items: center;
  //   align-items: center;
  gap: 10px;

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

export const StRefBox = styled.div`
  height: 200px;
`;
