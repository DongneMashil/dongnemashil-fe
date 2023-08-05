import { styled } from 'styled-components';
import { SpanProps } from './Span';

export const StSpan = styled.span<SpanProps>`
  display: block;
  color: ${(props) => props.color || 'black'};

  &.small {
    font-size: 0.8rem;
    line-height: 1.4rem;
  }

  &.normal {
    font-size: 1rem;
    line-height: 1.6rem;
  }

  &.title {
    font-size: 2rem;
    font-weight: 500;
    line-height: 3.2rem;
  }
`;
