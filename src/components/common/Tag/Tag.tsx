import React from 'react';
import { StTagContainer } from './Tag.styles';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Dog } from 'assets/icons/Dog.svg';
import { ReactComponent as Alone } from 'assets/icons/Alone.svg';
import { ReactComponent as Couple } from 'assets/icons/Couple.svg';
interface TagProps {
  text: string;
  onClick?: () => void;
  url?: string;
  isSelected?: boolean;
}

export const Tag = ({ text, onClick, url, isSelected = false }: TagProps) => {
  const navigate = useNavigate();

  return (
    <StTagContainer
      $isSelected={isSelected}
      onClick={url ? () => navigate(url) : onClick}
    >
      {(() => {
        switch (text) {
          case '동물친구들':
            return <Dog />;
          case '혼자서':
            return <Alone />;
          case '연인이랑':
            return <Couple />;
          default:
            return null;
        }
      })()}
      <h5>{text}</h5>
    </StTagContainer>
  );
};
