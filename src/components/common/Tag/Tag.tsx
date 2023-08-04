import React from 'react';
import { StTagContainer } from './Tag.style';
import { useNavigate } from 'react-router-dom';

interface TagProps {
  text: string;
  onClick?: () => void;
  url?: string;
}

export const Tag = ({ text, onClick, url }: TagProps) => {
  const navigate = useNavigate();
  const OnClickTag = <StTagContainer onClick={onClick}>{text}</StTagContainer>;
  const LinkTag = (
    <StTagContainer onClick={() => url && navigate(url)}>{text}</StTagContainer>
  );
  return url ? LinkTag : OnClickTag;
};
