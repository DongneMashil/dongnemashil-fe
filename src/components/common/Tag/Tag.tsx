import React from 'react';
import { styled } from 'styled-components';
interface Props {
  text: string;
  onClick: () => void;
}

export const Tag = ({ text, onClick }: Props) => {
  return <TagLayout onClick={onClick}>{text}</TagLayout>;
};

export const TagLayout = styled.div`
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #e1e4e8;
  color: #586069;
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  margin-right: 4px;
  padding: 3px 5px;
  vertical-align: middle;
  white-space: nowrap;
`;
