import { styled } from 'styled-components';

export const StReviewBox = styled.button<{ $imgUrl?: string }>`
  background: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  height: fit-content;
  margin-bottom: 1rem;
  padding-top: 0.5rem;
  gap: 0.8rem;
  cursor: pointer;

  .imgWrapper {
    width: 100%;
    aspect-ratio: 1/1;
    overflow: hidden;
    border-radius: 0.875rem;
    background-image: url(${(props) => props.$imgUrl});
    background-position: center;
    background-size: cover;
  }

  .contentWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    width: 100%;
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

export const StTabContentBox = styled.div<{ $empty?: boolean }>`
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 10px;

  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.03);
  border-radius: 0.875rem;

  gap: 10px;

  ${({ $empty }) =>
    $empty
      ? `display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;`
      : `  display: grid; 
  grid-template-columns: repeat(1, 1fr);
  @media (min-width: 300px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media(min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  
  `}
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
  padding: 0 1rem 0 1.5rem;
  margin: 0.5rem;
`;
export const StTabButtonBox = styled.div`
  display: flex;
`;
export const StText = styled.h2`
  display: flex;
  align-items: center;

  color: #6f6f6f;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  span {
    color: var(--textcolor, #333);
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

export const StEmptyBox = styled.div`
  display: flex;
  // flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 100px; // 높이 매우 낮아질때 반응형 적용 예정
`;
export const StRefBox = styled.div`
  height: 200px;
`;
