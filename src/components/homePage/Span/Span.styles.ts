import { styled } from 'styled-components';
import { SpanProps } from './Span';

export const StSpan = styled.span<SpanProps>`
  display: block;
  color: ${(props) => props.color || 'white'};

  &.small {
    font-size: 0%.8rem;
  }

  &.normal {
    font-size: 1rem;
  }

  &.title {
    font-size: 1.2rem;
    font-weight: 700;
  }
`;
