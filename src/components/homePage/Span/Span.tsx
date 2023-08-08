import React from 'react';
import { StSpan } from './Span.styles';

export interface SpanProps {
  children?: React.ReactNode;
  size?: 'small' | 'normal' | 'title';
  $color?: string;
}

const Span = React.memo(({ children, size = 'normal', $color }: SpanProps) => {
  return (
    <StSpan className={size} $color={$color}>
      {children}
    </StSpan>
  );
});

Span.displayName = 'Span';

export { Span };
