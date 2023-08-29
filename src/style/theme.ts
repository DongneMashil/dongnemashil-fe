import { css } from 'styled-components';

const colors = {
  whiteColor: '#ffffff',
  whiteGrayColor: '#e2e2e2',
  lightGrayColor: '#8e8e8e',
  mediumGrayColor: '#878787',
  darkGrayColor: '#656e75',
  blackColor: '#000000',

  mainColor: '#9A7B9A',
  subColor: '#B5A6CA',
  pointColor: '#886F88',

  mainTextColor: '#333333',
  titleTextColor: '#060606',

  backgroundColor: '#F7F7F7',
  windowBackgroundColor: '#FFFFFF',
};

const size = {
  mobile: '358px',
  tablet: '768px',
};
const maxSizes = {
  maxWidth: '390px',
  maxHeight: '850px',
};

const authLayout = css`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding: 43px 28px;
  margin: 0 auto;
`;

const authButton = css`
  width: 100%;
  height: 44px;
  font-size: 16px;
  border: 0;
  box-sizing: border-box;
  font-weight: 700;
  border-radius: 20px;
  position: relative;

  @media screen and (max-width: ${size.tablet}) {
    height: 47px;
  }
`;

const getAuthViewPoint = (page: string) => {
  switch (page) {
    case 'commonLogin':
      return '340px';
    case 'register':
      return '360px';
    case 'login':
      return '408px';
    default:
      return '768px';
  }
};

// 반응형 최상위 컴포넌트 믹스인
const responsiveLayout = css`
  width: 100%;
  height: 100%;
`;

// 반응형 콘텐츠 감싸는 컴포넌트 믹스인
const responsiveContainer = css`
  width: 100%;
  height: 100%;
  max-width: ${size.tablet};
  margin: 0 auto;
`;

export const theme = {
  ...colors,
  ...maxSizes,
  authLayout,
  authButton,
  device: {
    mobile: `(max-width: ${size.mobile})`,
    tablet: `(min-width: ${size.mobile}) and (max-width: ${size.tablet})`,
    desktop: `(min-width: ${size.tablet})`,
  },
  size,
  floatingBox: {
    width: '100%',
    backgroundColor: `${colors.windowBackgroundColor}`,

    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.8rem',
  },
  getAuthViewPoint,
  responsiveLayout,
  responsiveContainer,
};

// 사용법

// @media ${props => props.theme.device.mobile} {
//  ...
// }

// @media ${props => props.theme.device.tablet} {
//  ...
// }

// @media ${props => props.theme.device.desktop} {
//  ...
// }
