import React from 'react';
import { StTagContainer } from './Tag.styles';
import * as tagImg from 'assets/tags'; // 아이콘 가져오기
interface TagProps {
  text: string;
  onClick?: () => void;
  isSelected?: boolean;
  isHoverEnabled?: boolean;
}
type IconKeys =
  | 'animalFriends'
  | 'alone'
  | 'withLover'
  | 'bench'
  | 'quiet'
  | 'shade'
  | 'toilet'
  | 'photoPlace'
  | 'nature'
  | 'rainyDay'
  | 'nightWalk'
  | 'withBaby'
  | 'bicycle';

const iconMapping: { [key: string]: IconKeys } = {
  동물친구들: 'animalFriends',
  혼자서: 'alone', // 이 부분은 실제 tagImg의 키값과 일치해야 합니다.
  연인이랑: 'withLover',
  벤치: 'bench',
  한적해요: 'quiet',
  그늘: 'shade',
  화장실: 'toilet',
  사진맛집: 'photoPlace',
  자연: 'nature',
  비와도OK: 'rainyDay',
  밤산책: 'nightWalk',
  아기랑: 'withBaby',
  자전거: 'bicycle',
};
type SvgPath = string;

export const Tag = ({
  text,
  onClick,
  isSelected = false,
  isHoverEnabled = true,
}: TagProps) => {
  const getIcon = (label: string) => {
    const iconName = iconMapping[label];
    const iconSrc = iconName && (tagImg as Record<IconKeys, SvgPath>)[iconName];
    if (iconSrc) {
      return <img src={iconSrc} alt={label} />;
    }
    return null;
  };
  return (
    <StTagContainer
      $isSelected={isSelected}
      onClick={onClick}
      $isHoverEnabled={isHoverEnabled}
    >
      {getIcon(text)}
      <h5>{text}</h5>
    </StTagContainer>
  );
};
