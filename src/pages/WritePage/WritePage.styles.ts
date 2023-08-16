import { styled } from 'styled-components';

export const StContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StTagContainer = styled.div`
  width: 100%;
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