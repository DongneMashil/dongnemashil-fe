import React, { useState } from 'react';
import { StTagBox, StTagWrapper } from './ToggleTag.styles';
import * as tagImg from 'assets/tags';
interface ToggleTagButtonProps {
  onTagChange?: (selectedTags: string[]) => void;
}

export const ToggleTagButton: React.FC<ToggleTagButtonProps> = ({
  onTagChange,
}) => {
  const tags = [
    { id: 1, img: tagImg.animalFriends, label: '동물친구들' },
    { id: 2, img: tagImg.withLover, label: '연인이랑' },
    { id: 3, img: tagImg.bench, label: '벤치' },
    { id: 4, img: tagImg.quiet, label: '한적해요' },
    { id: 5, img: tagImg.shade, label: '그늘' },
    { id: 6, img: tagImg.toilet, label: '화장실' },
    { id: 7, img: tagImg.photoPlace, label: '사진맛집' },
    { id: 8, img: tagImg.nature, label: '자연' },
    { id: 9, img: tagImg.rainyDay, label: '비와도OK' },
    { id: 10, img: tagImg.nightWalk, label: '밤산책' },
    { id: 11, img: tagImg.withBaby, label: '아기랑' },
    { id: 12, img: tagImg.bicycle, label: '자전거' },
  ];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(updatedTags);
    onTagChange?.(updatedTags);
  };

  const onTagClick = (tag: string) => () => {
    toggleTag(tag);
  };

  return (
    <StTagWrapper>
      {tags.map((tag) => (
        <StTagBox
          key={tag.id}
          onClick={onTagClick(tag.label)}
          $isSelected={selectedTags.includes(tag.label)}
        >
          <img src={tag.img} />
          <span>{tag.label}</span>
        </StTagBox>
      ))}
    </StTagWrapper>
  );
};
