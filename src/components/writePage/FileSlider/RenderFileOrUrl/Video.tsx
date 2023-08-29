import React from 'react';
import { StVideo } from './RenderFileOrUrl.styles';

interface StVideoProps {
  src: string;
}

const areEqual = (
  prevProps: StVideoProps,
  nextProps: StVideoProps
): boolean => {
  return prevProps.src === nextProps.src;
};

const StVideoComponentBase: React.FC<StVideoProps> = ({ src }) => {
  return <StVideo src={src} controls />;
};

const StVideoComponent = React.memo(StVideoComponentBase, areEqual);

export default StVideoComponent;
