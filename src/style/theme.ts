const size = {
  mobile: '375px',
  tablet: '768px',
  desktop: '1000px',
};

export const theme = {
  device: {
    mobile: `(max-width: ${size.mobile})`,
    tablet: `(min-width: ${size.tablet}) and (max-width: ${size.desktop})`,
    desktop: `(min-width: ${size.desktop})`,
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
