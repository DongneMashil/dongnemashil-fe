import { theme } from './../../../style/theme';
import { styled } from 'styled-components';
import { SpanProps } from './Span';

export const StSpan = styled.span<SpanProps>`
  color: ${(props) => props.color || theme.blackColor};

  &.small {
    font-size: 0.8rem;
    line-height: 1.4rem;
  }

  &.normal {
    font-size: 1rem;
    line-height: 1.6rem;
  }

  &.title {
    font-size: 1.1rem;
    font-weight: 500;
    line-height: 3.2rem;

    strong {
      font-weight: 700;
    }
  }
`;
