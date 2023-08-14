import { styled } from 'styled-components';

export const StContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StTagContainer = styled.div`
  width: 24.4rem;
  height: 8.69rem;
  border-radius: 0.875rem;
  background: #fff;
  margin: 0.75rem 0;
  box-sizing: border-box;
`;

export const StCurrentAddress = styled.span`
  width: 6.4rem;
  height: 1.01rem;
  color: #333;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  margin-left: 0.33rem;
  cursor: pointer;
`;

export const StCurrentAddressWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.94rem 1.44rem 0;
`;

export const StTotalTag = styled.p`
  color: #6a6a6a;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StHiddenButton = styled.input`
  display: none;
`;

export const StContentBox = styled.textarea`
  width: 22rem;
  height: 17rem;
  margin: 2rem auto;
  resize: none;
  padding: 0.45rem;
  border: none;
`;

export const StTitle = styled.input`
  width: 22rem;
  height: 3.7525rem;
  padding-left: 0.3rem;
  border: none;
  border-bottom: 1px solid #e2e2e2;
  color: #a9a9a9;
  font-size: 1.33rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-top: 1.25rem;
`;

export const StFormWrapper = styled.div`
  width: 24.4rem;
  margin-top: 0.75rem;
  background-color: #fff;
  border-top-left-radius: 0.875rem;
  border-top-right-radius: 0.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
