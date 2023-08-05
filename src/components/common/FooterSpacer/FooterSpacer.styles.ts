import { styled } from 'styled-components';

interface StFooterSpacerProps {
  $height: string;
}
export const StFooterSpacer = styled.div<StFooterSpacerProps>`
  height: ${(props) => props.$height};
`;
