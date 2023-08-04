import React from 'react';
import { ModalPotal } from '../ModalPotal/ModalPotal';
import styled from 'styled-components';

interface MyFavoriteTagsProps {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}

export const MyFavoriteTags: React.FC<MyFavoriteTagsProps> = ({
  isModalOpen,
  setModalOpen,
}) => {
  return (
    <MyFavoriteTagsLayout>
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
      <button onClick={() => setModalOpen(false)}>Close Modal</button>
      <ModalPotal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalBox>모달 내용물</ModalBox>
      </ModalPotal>
    </MyFavoriteTagsLayout>
  );
};

export const MyFavoriteTagsLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  button {
    font-size: 16px;
    width: 100px;
    height: 40px;
    background-color: gray;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  }
`;
export const ModalBox = styled.div`
  width: 300px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;
