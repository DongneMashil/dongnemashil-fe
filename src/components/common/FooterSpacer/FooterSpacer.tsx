import React from 'react';
import { StFooterSpacer } from './FooterSpacer.styles';

interface FooterSpacerProps {
  height?: string;
}
/**
 * @param height 기본값 50px, 단위까지 입력해야함
 */
export const FooterSpacer = ({ height = '50px' }: FooterSpacerProps) => {
  return <StFooterSpacer $height={height} />;
};
