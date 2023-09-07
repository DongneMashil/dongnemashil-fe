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
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 0.875rem 0.875rem 0 0;
  box-shadow:
    0px -2px 10px 0px rgba(0, 0, 0, 0.2),
    0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  z-index: 999;
  background-color: #fff;
  padding: 1.37rem 1.5rem;
  @media ${(props) => props.theme.device.desktop} {
    height: 12.1rem;
  }
`;

export const StMaxSize = styled.div`
  ${theme.responsiveContainer}
  width:90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  justify-content: center;
  @media ${(props) => props.theme.device.desktop} {
    width: fit-content;
    align-items: flex-start;
  }
`;

export const StCurrentLocationTitle = styled.span`
  text-align: center;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: normal;
  color: #333;
  margin: 0.3rem auto 0.3rem 0;

  @media ${(props) => props.theme.device.desktop} {
    margin: 0 auto 0 1.4rem;
  }
`;

export const StTablet = styled.div`
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${(props) => props.theme.device.desktop} {
    flex-direction: row;
    justify-content: center;
    margin: 1rem;
  }
`;

export const StInputWrapper = styled.div`
  width: 100%;
  height: 2rem;
  border-bottom: 1px solid #dbdbdb;
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding-left: 0.5rem;
  @media ${(props) => props.theme.device.desktop} {
    padding-bottom: 0;
    width: 23.6rem;
    height: 3.625rem;
    border-radius: 1.88rem;
    border: 1px solid #dbdbdb;
    background-color: #f7f7f7;
    padding-left: 1.1rem;
  }
`;

export const StMarker = styled(MarkerIcon)`
  width: 0.8125rem;
  height: 1.08331rem;
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
    font-size: 1rem;
  }
`;

export const StPostButton = styled.button`
  // width: 90%;
  width: 100%;
  height: 3.13rem;
  border-radius: 0.75rem;
  border: 1px solid #9a7b9a;
  background: #996899;
  color: #fff;

  margin-top: 2.4rem;

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
    margin-top: 0;
    margin-left: 2rem;
  }
`;
