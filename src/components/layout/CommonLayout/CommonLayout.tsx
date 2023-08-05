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
  headerHeight?: string;
  footerHeight?: number;
  hideHeader?: boolean;
}

/**
 * CommonLayout
 * @param children 본문 컨텐츠는 children에 넣어줄것
 * @param 선택사항 header, prop으로 JSX 넘겨줄것
 * @param 선택사항 footer, prop으로 JSX 넘겨줄것, 사용시 footerSpacer를 사용해야함
 * @param 선택사항 headerHeight 딘위까지 입력해야함, 기본값 50px
 * @param 선택사항 hideHeader 스크롤시 헤더 숨김 여부. 기본값 true
 */
export const CommonLayout: React.FC<CommonLayoutProps> = ({
  children,
  header,
  footer,
  headerHeight = '50px',
  hideHeader = true,
}) => {
  const [isShow, setIsShow] = React.useState(true);
  const [prevPosition, setPrevPosition] = React.useState(0);

  const scrollRef = React.useRef<HTMLDivElement>(null);

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
      <StLayoutBody>
        <StSlidingHeader $isShow={isShow}>{header}</StSlidingHeader>
        <StLayoutSection ref={scrollRef} $headerHeight={headerHeight}>
          {children}
        </StLayoutSection>
        {footer}
      </StLayoutBody>
    </StLayoutOuter>
  );
};
