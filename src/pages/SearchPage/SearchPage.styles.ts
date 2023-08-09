import styled from 'styled-components';
import { StInput } from 'components/common/Input/Input.styles';

export const StSearchHeader = styled.div`
  border-bottom: 1px solid #e3e3e3;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  & > div {
    display: flex;
    justify-content: center;
    align-items: flex-start;

    /* & > svg:first-child {
      margin-right: auto;
    } */
  }
`;

export const StSearchInput = styled(StInput)`
  width: 166px;
  border-radius: 25px;
  margin: 12px 0;
`;
