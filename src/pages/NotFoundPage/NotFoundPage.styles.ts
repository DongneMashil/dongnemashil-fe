import styled from 'styled-components';
import { theme } from 'style/theme';

export const StNotFoundContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StError404Msg = styled.h3`
  color: ${theme.mainColor};
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 32px;
  margin-bottom: 9rem;
`;
