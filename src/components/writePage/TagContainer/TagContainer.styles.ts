import { styled } from 'styled-components';
import { ReactComponent as PurpleMarker } from 'assets/icons/PurpleMarker.svg';

export const StTagContainer = styled.div`
  width: 100%;
  height: 9rem;
  border-radius: 0.875rem;
  background: #fff;
  box-sizing: border-box;
  padding: 0.1rem;
  @media ${(props) => props.theme.device.desktop} {
    display: flex;
    justify-content: row;
    padding: 1rem;
  }
`;

export const StCurrentAddressWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.88rem 1.54rem 0 1.54rem;
  @media ${(props) => props.theme.device.desktop} {
    display: flex;
    flex-direction: column;
    margin: auto;
    & > * {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const StTotalTag = styled.p`
  color: #6a6a6a;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  @media ${(props) => props.theme.device.desktop} {
    margin-left: 0.625rem;
  }
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
  @media ${(props) => props.theme.device.desktop} {
    margin-left: 0.5625rem;
    margin-bottom: 0.19rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const StPurpleMarker = styled(PurpleMarker)`
  @media ${(props) => props.theme.device.desktop} {
    width: 1.5rem;
    height: 2rem;
    margin-left: 3.15rem;
    margin-bottom: 0.25rem;
  }
`;
