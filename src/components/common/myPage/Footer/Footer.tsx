import { WriteButton } from 'components/common/SpecialButtons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';

export const Footer = () => {
  const navigate = useNavigate();
  const onClickWrite = () => {
    navigate('/write');
  };
  return (
    <StFooterContatiner>
      <StFooterWrapper>
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
