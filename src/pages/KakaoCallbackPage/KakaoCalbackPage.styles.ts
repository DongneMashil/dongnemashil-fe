import styled from 'styled-components';
import { theme } from 'style/theme';

export const StLoginContainer = styled.div`
  ${theme.authLayout};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 70px;
`;
