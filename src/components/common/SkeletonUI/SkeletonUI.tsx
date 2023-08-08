import React from 'react';
import styled from 'styled-components';

interface MockTextProps {
  height?: string;
  width?: string;
  margin?: string;
}

const ItemBox = styled.div`
  display: grid;
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
  -ms-grid-columns: 12.5rem;
  .img {
    aspect-ratio: 1/1;
    width: 100%;
    border-radius: 0.5rem;
    object-fit: cover;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
`;

const MockText = styled.div<MockTextProps>`
  height: ${(props) => props.height || '1'}rem;
  width: ${(props) => props.width || '10'}rem;
  margin-top: ${(props) => props.margin || '0'}rem;
  border-radius: 0.7rem;
  animation: skeleton-gradient 1.5s infinite ease-in-out;
`;

const SkeletonUI: React.FC = () => {
  return (
    <ItemBox>
      <div className="img"></div>
      <Description>
        <MockText width="20" height="3" />
        <MockText width="10" />
        <MockText width="18" margin="1" />
        <MockText width="15" />
      </Description>
    </ItemBox>
  );
};

export default SkeletonUI;
