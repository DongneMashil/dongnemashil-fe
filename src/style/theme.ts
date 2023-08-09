const colors = {
  whiteColor: '#ffffff',
  lightGrayColor: '#dddddd',
  mediumGrayColor: '#939393',
  darkGrayColor: '#656e75',
  blackColor: '#000000',

  primaryColor: '#35c5f0',
  primaryDarkColor: '#09addb',
  secondaryColor: '#FF7777',
};

const size = {
  mobile: '375px',
  tablet: '768px',
  desktop: '1000px',
};

export const theme = {
  ...colors,
  device: {
    mobile: `(max-width: ${size.mobile})`,
    tablet: `(min-width: ${size.tablet}) and (max-width: ${size.desktop})`,
    desktop: `(min-width: ${size.desktop})`,
  },
  floatingBox: {
    width: '100%',
    backgroundColor: 'white',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.8rem',
  },
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
