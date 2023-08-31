import React from 'react';
import { ReactComponent as DeleteIcon } from 'assets/icons/DeleteXMark.svg';
import { StDeleteKeywordButton } from './DeleteKeywordButton.styles';

export const DeleteKeywordButton = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLHtmlElement>) => void;
}) => {
  const onDelete = (e: React.MouseEvent<HTMLHtmlElement>) => {
    onClick(e);
  };
  return (
    <StDeleteKeywordButton onClick={onDelete}>
      <DeleteIcon />
    </StDeleteKeywordButton>
  );
};
