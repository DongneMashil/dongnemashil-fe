import { styled } from 'styled-components';

export const StTagContainer = styled.div`
  width: 100%;
  height: 9rem;
  border-radius: 0.875rem;
  background: #fff;
  box-sizing: border-box;
  padding: 0.1rem;
`;

export const StCurrentAddressWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.88rem 1.54rem 0 1.54rem;
`;

export const StTotalTag = styled.p`
  color: #6a6a6a;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
