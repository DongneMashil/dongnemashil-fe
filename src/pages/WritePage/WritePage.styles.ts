import { styled } from 'styled-components';

export const StContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StHiddenButton = styled.input`
  display: none;
`;

export const StContentBox = styled.textarea`
  width: 22rem;
  height: 17rem;
  margin: 2rem auto;
  resize: none;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 0.45rem;
`;

export const StTitle = styled.input`
  width: 22rem;
  height: 1.8rem;
  padding-left: 0.3rem;
`;

export const StTagWwrapper = styled.div`
  width: 22rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const StTagBox = styled.span<{ $isSelected: boolean }>`
  border: 1px solid #b5a6ca;
  height: 1.5rem;
  line-height: 1.6rem;
  border-radius: 1rem;
  font-size: 14px;
  padding: 0 0.79rem
  /* background-color:${($isSelected) =>
    $isSelected ? '#b5a6ca' : 'transparent'}; */
`;
