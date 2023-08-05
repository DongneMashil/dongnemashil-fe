import React from 'react';
import {
  StFloatingFooter,
  StFloatingFooterFixed,
} from './FloatingFooter.styles';
interface FooterProps {
  children: React.ReactNode;
}

export const FloatingFooter = ({ children }: FooterProps) => {
  return (
    <StFloatingFooter>
      <StFloatingFooterFixed className="fixed">
        {children}
      </StFloatingFooterFixed>
    </StFloatingFooter>
  );
};

/**
 * FloatingFooter 떠있는 버튼 children 사용 예시
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
     * FloatingFooter 고정된 하단바 children 사용 예시
     * 
     * 다음과 같이 페이지별로 하단바를 만들어서 사용하면 됩니다.
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
