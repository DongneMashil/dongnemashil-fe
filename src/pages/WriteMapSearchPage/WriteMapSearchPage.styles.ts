import { styled } from 'styled-components';
import { ReactComponent as MarkerIcon } from 'assets/icons/Marker.svg';
import { theme } from 'style/theme';

export const StLayout = styled.div`
  ${theme.responsiveLayout}
`

export const StLayoutContainer = styled.div`
  ${theme.responsiveContainer}
`

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
  height: 100vh;
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

export const StSearchResultWrapper = styled.div`
  width: 24rem;
  margin-top: 0.44rem;
  box-sizing: border-box;
  background-color: #fff;
  @media ${(props) => props.theme.device.desktop} {
    width: 31.9rem;
  }
`;

export const StSearchResult = styled.div`
  width: 24.4rem;
  height: 4.81rem;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #e3e3e3;
  padding-left: 1.56rem;
  padding-top: 1.25rem;
  box-sizing: border-box;
  @media ${(props) => props.theme.device.desktop} {
    width: 31.9rem;
  }
`;

export const StPlaceName = styled.span`
  text-align: center;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-right: auto;
`;

export const StRoadBox = styled.div`
  width: 19.62rem;
  height: 4.81rem;
  display: flex;
  flex-direction: column;
`;

export const StRoadName = styled.span`
  color: #929292;
  text-align: center;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-right: auto;
  margin-bottom: 0.38rem;
`;

export const StChooseButton = styled.button`
  width: 3.81rem;
  height: 1.94rem;
  border-radius: 1.25rem;
  background-color: #fff;
  border: 1px solid #e2e2e2;
  margin-right: 0.94rem;
  box-sizing: border-box;
  color: #333;
  text-align: center;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
`;
