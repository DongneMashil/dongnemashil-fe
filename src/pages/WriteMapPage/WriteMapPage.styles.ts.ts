import { styled } from 'styled-components';
import { ReactComponent as MarkerIcon } from 'assets/icons/Marker.svg';
import { theme } from 'style/theme';

export const StWirteMapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const StCurrentLocationContainer = styled.div`
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
  padding: 1.37rem 0.95rem 3.31rem 0.95rem;
  @media ${(props) => props.theme.device.desktop} {
    height: 12.1rem;
    padding: 2.06rem 0 0 6rem;
  }
`;

export const StMaxSize = styled.div`
  ${theme.responsiveContainer}
  margin: 0 auto
`;

export const StCurrentLocationTitle = styled.span`
  text-align: center;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: normal;
  color: #333;
  margin-bottom: 1.94rem;
  margin-left: 1.5rem;
  @media ${(props) => props.theme.device.desktop} {
    margin-left: 1.3125rem;
  }
`;

export const StTablet = styled.div`
  width: 100%;
  margin-top: 1rem;
  @media ${(props) => props.theme.device.desktop} {
    display: flex;
    flex-direction: row;
  }
`;

export const StInputWrapper = styled.div`
  width: 100%;
  height: 2rem;
  border-bottom: 1px solid #dbdbdb;
  display: flex;

  @media ${(props) => props.theme.device.desktop} {
    width: 23.6rem;
    height: 3.625rem;
    border-radius: 1.88rem;
    border: 1px solid #dbdbdb;
    padding-top: 1rem;
    background-color: #f7f7f7;
  }
`;

export const StMarker = styled(MarkerIcon)`
  width: 0.8125rem;
  height: 1.08331rem;
  margin: 0 0.44rem 0 1.69rem;
  @media ${(props) => props.theme.device.desktop} {
    margin-left: 1.3rem;
    margin-top: 0.125rem;
  }
`;

export const StCurrentLocationText = styled.span`
  height: 1.1875rem;
  color: #5f5f5f;
  font-size: 0.89rem;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  margin-right: 1.3rem;
  text-overflow: ellipsis;
  @media ${(props) => props.theme.device.desktop} {
    margin-bottom: 1.12rem;
    font-size: 1rem;
    margin-top: 0.125rem;
  }
`;

export const StPostButton = styled.button`
  width: 90%;
  height: 3.13rem;
  border-radius: 0.75rem;
  border: 1px solid #9a7b9a;
  background: #996899;
  color: #fff;
  margin: 2.44rem 2rem 2rem 2rem;
  color: #fff;
  text-align: center;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  box-sizing: border-box;
  @media ${(props) => props.theme.device.desktop} {
    width: 11.5rem;
    height: 3.625rem;
    border-radius: 1.88rem;
    margin: 0 0 3.81rem 2rem;
  }
`;
