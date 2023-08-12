import React from 'react';
import { Button } from 'components/common';
import { ReactComponent as Pen } from 'assets/icons/Pen.svg';
import { ReactComponent as PurpleMarker } from 'assets/icons/PurpleMarker.svg';

import {
  StRightBtnWrapper,
  StCenterBtnWrapper,
  StFixFooter,
} from './FixFooter.styles';

export const FixFooter = () => {
  return (
    <StFixFooter>
      <StCenterBtnWrapper>
        <Button
          type="borderround"
          $width={'90px'}
          $height={'27px'}
          $round={'16px'}
          $stroke={'1px'}
        >
          <PurpleMarker />
          <span>지도 보기</span>
        </Button>
      </StCenterBtnWrapper>
      <StRightBtnWrapper>
        <Button type="circlefill" $width={'57px'} $height={'57px'}>
          우리
          <br />
          동네
        </Button>
        <Button
          type="borderround"
          $width={'70px'}
          $height={'70px'}
          $round={'50%'}
          $stroke={'2px'}
        >
          <Pen />
        </Button>
      </StRightBtnWrapper>
    </StFixFooter>
  );
};
