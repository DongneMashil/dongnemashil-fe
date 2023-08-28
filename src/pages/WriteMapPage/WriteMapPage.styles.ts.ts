import { styled } from 'styled-components';
import { ReactComponent as MarkerIcon } from 'assets/icons/Marker.svg';

export const StWirteMapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const StCurrentLocationContainer = styled.div`
  height: 12.9rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  margin-bottom: 1.4rem;
`;

export const StInputWrapper = styled.div`
  width: 90%;
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
  font-size: 0.89rem;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

export const StPostButton = styled.button`
  width: 90%;
  height: 3.13rem;
  border-radius: 0.75rem;
  border: 1px solid #9a7b9a;
  background: #996899;
  color: #fff;
  margin-top: 2.34rem;
  color: #fff;
  text-align: center;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
`;
