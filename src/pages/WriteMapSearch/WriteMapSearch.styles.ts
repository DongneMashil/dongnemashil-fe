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
  margin-top: 0.87rem;
`

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
`;
