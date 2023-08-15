import { OurTownButton, WriteButton } from 'components/common';
import React from 'react';

import { styled } from 'styled-components';

interface FooterProps {
  onClickOurTown?: () => void;
  onClickWrite?: () => void;
}
export const Footer = ({
  onClickOurTown = () => {
    alert('동네보기 연결중'); // 지워도 됩니다
  },
  onClickWrite = () => {
    alert('작성하기 연결중'); // 지워도 됩니다
  },
}: FooterProps) => {
  return (
    <StFooterContatiner>
      <StFooterWrapper>
        <OurTownButton onClick={onClickOurTown} />
        <WriteButton onClick={onClickWrite} />
      </StFooterWrapper>
    </StFooterContatiner>
  );
};

export const StFooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  gap: 1rem;
  width: fit-content;
`;

export const StFooterContatiner = styled.footer`
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0.7rem 2rem 1rem;
`;
