import { styled } from 'styled-components';
import { ReactComponent as MarkerIcon } from 'assets/icons/Marker.svg';

export const StSearchBox = styled.div`
  width: 22.25rem;
  height: 2.4374rem;
  border-radius: 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #f6f6f6;
  padding: 0.53rem 0 0.53rem 0.94rem;
  display: flex;
  align-items: center;
`;

export const StSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 0.87rem;
  background-color: #fff;
  height: 100%;
`;

export const StMarker = styled(MarkerIcon)`
  width: 0.8125rem;
  height: 1.08331rem;
  margin-right: 0.62rem;
`;

export const StSearchInput = styled.input`
  width: 90%;
  background-color: transparent;
  border: none;
  color: #333;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  outline: none;
`;

export const StSeacrhResultWrapper = styled.div`
  width: 24rem;
  border-top: 1px solid #e3e3e3;
  margin-top: 0.44rem;
  box-sizing: border-box;
  background-color: #fff;
`;

export const StSearchResult = styled.div`
  width: 24.4rem;
  height: 4.81rem;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e3e3e3;
  padding-left: 1.56rem;
  padding-top: 1.25rem;
  box-sizing: border-box;
`;

export const StPlaceName = styled.span`
  text-align: center;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-right: auto;
`;

export const StRoadName = styled.span`
  color: #929292;
  text-align: center;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
