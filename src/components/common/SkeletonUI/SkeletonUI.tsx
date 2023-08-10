import React from 'react';
import styled from 'styled-components';

interface MockTextProps {
  height?: string;
  width?: string;
  margin?: string;
  borderRadius?: string;
  ref?: React.Ref<HTMLDivElement> | null;
}

const MockText = styled.div<MockTextProps>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  border-radius: ${(props) => props.borderRadius};
  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.03);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.12);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.03);
    }
  }
  animation: skeleton-gradient 1.5s infinite ease-in-out;
`;
interface SkeletonUIProps {
  height?: string;
  width?: string;
  margin?: string;
  borderRadius?: string;
}

const SkeletonUI = React.forwardRef<HTMLDivElement, SkeletonUIProps>(
  (
    { height = '10px', width = '10px', margin = '0', borderRadius = '.8rem' },
    ref
  ) => {
    return (
      <MockText style={{ height, width, margin, borderRadius }} ref={ref} />
    );
  }
);
SkeletonUI.displayName = 'SkeletonUI';

export default SkeletonUI;
