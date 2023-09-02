import { styled } from 'styled-components';

export const StHiddenButton = styled.input`
  display: none;
`;

export const StContentBox = styled.textarea`
  width: 100%;
  height: 17rem;
  margin: 2rem auto;
  resize: none;
  padding: 1.13rem;
  border: none;
  font-family: Pretendard;
  border-top: 1px solid #e2e2e2;
  font-size: 1rem;
  position: relative;
  outline: none;
`;

export const StTitle = styled.input`
  width: 100%;
  height: 3.7525rem;
  padding-left: 0.3rem;
  padding-right: 4.3rem;
  border: none;
  border-bottom: 1px solid #e2e2e2;
  color: #333;
  font-size: 1.33rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-top: 1.25rem;
  margin-bottom: 0.9375rem;
  outline: none;
  font-family: Pretendard;
`;

export const StFormWrapper = styled.div`
  width: 100%;
  margin-top: 0.75rem;
  background-color: #fff;
  border-top-left-radius: 0.875rem;
  border-top-right-radius: 0.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StContentWrapper = styled.div`
  position: relative;
  width: 90%;
`;

export const StByteSizeTag = styled.p<{ color?: string }>`
  position: absolute;
  bottom: 1.4rem;
  right: 0.9rem;
  color: ${(props) => props.color || '#a9a9a9'};
  text-align: center;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
