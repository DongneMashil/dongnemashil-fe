import styled from 'styled-components';
import { StInput } from 'components/common/Input/Input.styles';
import { StHeaderTextH1 } from 'components/common/HeaderText/HeaderText.styles';
import { theme } from 'style/theme';

export const StSearchContainer = styled.div`
  ${theme.responsiveLayout};
  height: 100vh;
  border-bottom: 1px solid #e3e3e3;
  background-color: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media screen and (min-width: 510px) {
    background-color: #f7f7f7;
  }
`;

export const StSearchWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 54px 0 18px;
  background: #ffffff;
  border-radius: 0px 0px 14px 14px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 1;
`;

export const StSearchBox = styled.div`
  ${theme.responsiveContainer};
  max-width: 510px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  & > button {
    position: absolute;
    top: 0;
    left: 27px;
  }
`;
export const StSearchInputBox = styled.div`
  width: 216px;
  height: 37px;
  margin: 12px 0;
  flex-grow: 0;
  position: relative;

  & > svg {
    position: absolute;
    top: 12px;
    left: 16px;
  }

  @media screen and (min-width: 510px) {
    width: 346px;
  }
`;

export const StSearchInput = styled(StInput)`
  border-radius: 20px;
  padding: 0 2.5rem;
  text-align: center;
  border-color: #996899;

  &::placeholder {
    color: #616161;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  &:focus {
    background-color: #ffffff;
  }
`;

export const StSearchHeaderText = styled(StHeaderTextH1)`
  margin-left: 7px;
`;

export const StRecentKeywordsWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: relative;
  z-index: 0;
  margin: 5px auto 0;
  padding: 20px 28px;

  @media screen and (min-width: 510px) {
    width: 510px;
    border-radius: 0px 0px 14px 14px;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.06);
  }
`;

export const StRecentKeywordsHeader = styled.h3`
  font-weight: 600;
`;

export const StRecentKeywordsBox = styled.ul`
  padding: 0 15px;
  margin-top: 28px;

  & > li {
    width: 100%;
    margin-bottom: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & > button {
      background-color: transparent;
      font-size: 16px;
      font-weight: 400;
      cursor: pointer;
      color: inherit;
    }
  }
`;
