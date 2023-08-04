import React from 'react';
import { TagLayout } from './style';

interface Props {
  text: string;
  onClick: () => void;
}

export const Tag = ({ text, onClick }: Props) => {
  return <TagLayout onClick={onClick}>{text}</TagLayout>;
};
