import { styled } from 'styled-components';

export const StTagWrapper = styled.ul`
  padding: 1rem;
  overflow-x: auto;
  white-space: nowrap;
  display: flex;
  align-items: start;
  flex-direction: column;

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */

  div {
    display: flex;

    &:nth-child(1) {
      margin-bottom: 12px;
    }
  }
`;
