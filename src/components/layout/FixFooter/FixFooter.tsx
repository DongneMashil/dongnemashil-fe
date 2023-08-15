import React from 'react';
import { Button } from 'components/common';
import { ReactComponent as Pen } from 'assets/icons/Pen.svg';
import { ReactComponent as PurpleMarker } from 'assets/icons/PurpleMarker.svg';
import { ReactComponent as ChevronTop } from 'assets/icons/ChevronTop.svg';
import {
  StRightBtnWrapper,
  StCenterBtnWrapper,
  StFixFooter,
} from './FixFooter.styles';

export interface FixFooterProps {
  centerButtons?: 'map';
  rightButtons: 'write' | 'goTop';
}

export const FixFooter = ({ centerButtons, rightButtons }: FixFooterProps) => {
  const centerWrapper = {
    map: (
      <Button
        type="borderRound"
        $width={'90px'}
        $height={'27px'}
        $round={'16px'}
        $stroke={'1px'}
      >
        <PurpleMarker />
        <span>지도 보기</span>
      </Button>
    ),
  };

  const rightWrapper = {
    write: (
      <>
        <Button type="circleFill" $width={'57px'} $height={'57px'}>
          우리
          <br />
          동네
        </Button>
        <Button
          type="borderRound"
          $width={'70px'}
          $height={'70px'}
          $round={'50%'}
          $stroke={'2px'}
        >
          <Pen />
        </Button>
      </>
    ),
    goTop: (
      <>
        <Button
          type="borderRound"
          $width={'48px'}
          $height={'48px'}
          $round={'50%'}
          $stroke={'1px'}
        >
          <ChevronTop />
        </Button>
      </>
    ),
  };
  console.log(rightButtons);

  return (
    <StFixFooter>
      <StCenterBtnWrapper>
        {centerButtons && centerWrapper[centerButtons]}
      </StCenterBtnWrapper>
      <StRightBtnWrapper type={rightButtons}>
        {rightButtons && rightWrapper[rightButtons]}
      </StRightBtnWrapper>
    </StFixFooter>
  );
};
