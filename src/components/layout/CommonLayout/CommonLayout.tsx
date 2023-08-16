import React, { useEffect } from 'react';
import {
  StLayoutBody,
  StLayoutOuter,
  StLayoutSection,
  StModalPotal,
  StSlidingHeader,
} from './CommonLayout.styles';
import { FloatingFooter } from './components/FloatingFooter/FloatingFooter';

interface CommonLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  headerHeight?: string;
  footerHeight?: number;
  hideHeader?: boolean;
  backgroundColor?: string;
}

/**
 * CommonLayout
 * @param children 본문 컨텐츠는 children에 넣어줄것
 * @param 선택사항 header, prop으로 JSX 넘겨줄것
 * @param 선택사항 footer, prop으로 JSX 넘겨줄것, 사용시 footerSpacer를 사용해야함
 * @param 선택사항 headerHeight 딘위까지 입력해야함, 기본값 50px
 * @param 선택사항 hideHeader 스크롤시 헤더 숨김 여부. 기본값 true
 * @param 선택사항 backgroundColor 배경색 지정. 기본값 #fff
 */
export const CommonLayout: React.FC<CommonLayoutProps> = ({
  children,
  header,
  footer,
  headerHeight = '50px',
  hideHeader = true,
  backgroundColor = '#F7F7F7',
}) => {
  const [isShow, setIsShow] = React.useState(true);
  const [prevPosition, setPrevPosition] = React.useState(0);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  headerHeight = header ? headerHeight : '0px';
  useEffect(() => {
    const onScroll = () => {
      if (scrollRef.current) {
        const { scrollTop } = scrollRef.current;
        // console.log(scrollTop + '❤️‍🩹');
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
        <StModalPotal id="modal"></StModalPotal>
        {header && <StSlidingHeader $isShow={isShow}>{header}</StSlidingHeader>}
        <StLayoutSection
          ref={scrollRef}
          $headerHeight={headerHeight}
          $backgroundColor={backgroundColor}
        >
          {children}
        </StLayoutSection>
        {footer && <FloatingFooter>{footer}</FloatingFooter>}
      </StLayoutBody>
    </StLayoutOuter>
  );
};

/**
 * ###Footer 떠있는 버튼 children 사용 예시###
 * 아래처럼 페이지용 컴포넌트를 만들어서, footer prop으로 넘겨주면 됩니다.
 *  <div
    style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '200px',
        padding: '0 20px',
    }}
    >
    <Button
        type={'normal'}
        onClick={() => navigate(`/review/${reviewId}`)}
    >
  마이페이지
    </Button>
    <Button
        type={'normal'}
        onClick={() => navigate(`/review/${reviewId}`)}
    >
    홈으로
    </Button>
    </div>
 */

/**
     * ###Footer 고정된 하단바 children 사용 예시###
     *  * 아래처럼 페이지용 컴포넌트를 만들어서, footer prop으로 넘겨주면 됩니다.
     * 다음과 같이 페이지별로 하단바를 만들어서 사용하면 됩니다.(사실 배경 있냐없냐 차이입니다.)
        import React from 'react';
        import { styled } from 'styled-components';
        export const Footer = () => {
        return <StFooterContatiner>버튼이나 인풋들어가는 곳</StFooterContatiner>;
        };

        export const StFooterContatiner = styled.footer`
        background-color: #fff;
        border-top: 1px solid #ccc;
        height: 50px;
        `;

`;

    *여기에서 사용된 height는 고정된 하단바의 높이이며, 페이지 최 하단에 FooterSpacer를 사용하여
    *하단바의 높이만큼 공간을 만들어주어야 합니다. (공통컴포넌트에 있음)
    *<FooterSpacer height="80px"/>


     */
