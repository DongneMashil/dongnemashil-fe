import { styled } from 'styled-components';
import { ReactComponent as MarkerIcon } from 'assets/icons/Marker.svg';

export const StCurrentLocationContainer = styled.div`
  height: 12.9rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 0.875rem 0.875rem 0 0;
  z-index: 999;
  background-color: #fff;
  padding-top: 1.37rem;
  padding-left: 1.5rem;
`;

export const StCurrentLocationTitle = styled.span`
  text-align: center;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: normal;
  color: #333;
  margin-right: auto;
  margin-bottom: 1.4rem;
`;

export const StInputWrapper = styled.div`
  width: 22.5rem;
  height: 2rem;
  border-bottom: 1px solid #dbdbdb;
`;

export const StMarker = styled(MarkerIcon)`
  width: 0.8125rem;
  height: 1.08331rem;
  margin: 0 0.44rem;
`;

export const StCurrentLocationText = styled.span`
  width: 11.125rem;
  height: 1.1875rem;
  color: #5f5f5f;
  font-size: 1rem;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

export const StPostButton = styled.button`
  width: 6.19rem;
  height: 2rem;
  border-radius: 1rem;
  border: 1px solid #9a7b9a;
  background: #9a7b9a;
  color: #fff;
  margin: 1.44rem 1.88rem 3.56rem 16.31rem ;
`;
