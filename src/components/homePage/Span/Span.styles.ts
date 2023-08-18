import { styled } from 'styled-components';
import { theme } from './../../../style/theme';
import { SpanProps } from './Span';

export const StSpan = styled.span<SpanProps>`
  color: ${(props) => props.$color || theme.blackColor};

  &.small {
    font-size: 0.875rem;
    line-height: 1.2rem;
    font-weight: 500;
    color: ${theme.lightGrayColor};
  }

  &.normal {
    font-size: 1rem;
    line-height: 1.4rem;
  }

  &.title {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4rem;

    strong {
      font-weight: 700;
    }
  }
`;
