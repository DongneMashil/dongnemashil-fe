import { WriteButton } from 'components/common';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StFooterContatiner, StFooterWrapper } from './Footer.styles';

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
