import React, { useEffect } from 'react';
import {
  StLayoutBody,
  StLayoutOuter,
  StLayoutSection,
  StSlidingHeader,
} from './CommonLayout.styles';

interface CommonLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  headerHeight?: number;
  footerHeight?: number;
  hideHeader?: boolean;
}

export const CommonLayout: React.FC<CommonLayoutProps> = ({
  children,
  header,
  footer,
  headerHeight,
  footerHeight,
  hideHeader = true,
}) => {
  const [isShow, setIsShow] = React.useState(true);
  const [prevPosition, setPrevPosition] = React.useState(0);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  let gap = 0;
  headerHeight = headerHeight ? headerHeight : 50;
  footerHeight = footerHeight ? footerHeight : 50;
  if (footer) gap = footerHeight;
  if (header) {
    gap = headerHeight;
  }
  if (header && footer) {
    gap = headerHeight + footerHeight;
  }

  useEffect(() => {
    const onScroll = () => {
      if (scrollRef.current) {
        const { scrollTop } = scrollRef.current;
        console.log(scrollTop + '❤️‍🩹');
        if (scrollTop > prevPosition) {
          setIsShow(false);
        } else {
          setIsShow(true);
        }
        setPrevPosition(scrollTop);
      }
    };
    if (scrollRef.current && hideHeader) {
      scrollRef.current.addEventListener('scroll', onScroll);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', onScroll);
      }
    };
  }, [prevPosition]);

  return (
    <StLayoutOuter>
      <StLayoutBody $gap={gap}>
        <StSlidingHeader $isShow={isShow}>{header}</StSlidingHeader>
        <StLayoutSection ref={scrollRef} $headerHeight={headerHeight}>
          {children}
        </StLayoutSection>
        {footer}
      </StLayoutBody>
    </StLayoutOuter>
  );
};
