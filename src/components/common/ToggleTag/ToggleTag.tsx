import React, { useState } from 'react';
import { StTagBox, StTagWrapper } from './ToggleTag.styles';
import * as tagImg from 'assets/tags';

interface ToggleTagButtonProps {
  onTagChange?: (selectedTags: string[]) => void;
}

interface TagProps {
  id: number;
  img: string;
  label: string;
  isSelected: boolean;
}

export const ToggleTagButton: React.FC<ToggleTagButtonProps> = ({
  onTagChange,
}) => {
  const initialTags: TagProps[] = [
    {
      id: 1,
      img: tagImg.animalFriends,
      label: '동물친구들',
      isSelected: false,
    },
    { id: 2, img: tagImg.withLover, label: '연인이랑', isSelected: false },
    { id: 3, img: tagImg.bench, label: '벤치', isSelected: false },
    { id: 4, img: tagImg.quiet, label: '한적해요', isSelected: false },
    { id: 5, img: tagImg.shade, label: '그늘', isSelected: false },
    { id: 6, img: tagImg.toilet, label: '화장실', isSelected: false },
    { id: 7, img: tagImg.photoPlace, label: '사진맛집', isSelected: false },
    { id: 8, img: tagImg.nature, label: '자연', isSelected: false },
    { id: 9, img: tagImg.rainyDay, label: '비와도OK', isSelected: false },
    { id: 10, img: tagImg.nightWalk, label: '밤산책', isSelected: false },
    { id: 11, img: tagImg.withBaby, label: '아기랑', isSelected: false },
    { id: 12, img: tagImg.bicycle, label: '자전거', isSelected: false },
  ];

  const [tags, setTags] = useState<TagProps[]>(initialTags);

  const toggleTag = (tag: TagProps) => {
    const updatedTags = tags.map((t) =>
      t.id === tag.id ? { ...t, isSelected: !t.isSelected } : t
    );

    setTags(updatedTags);
    onTagChange?.(updatedTags.filter((t) => t.isSelected).map((t) => t.label));
  };

  const selectedTags = tags.filter((tag) => tag.isSelected);
  const unselectedTags = tags.filter((tag) => !tag.isSelected);

  return (
    <StTagWrapper>
      {selectedTags.map((tag) => (
        <StTagBox
          key={tag.id}
          onClick={() => toggleTag(tag)}
          $isSelected={true}
        >
          <span>
            <img src={tag.img} alt={tag.label} />
            <span>{tag.label}</span>
          </span>
        </StTagBox>
      ))}
      {unselectedTags.map((tag) => (
        <StTagBox
          key={tag.id}
          onClick={() => toggleTag(tag)}
          $isSelected={false}
        >
          <span>
            <img src={tag.img} alt={tag.label} />
            <span>{tag.label}</span>
          </span>
        </StTagBox>
      ))}
    </StTagWrapper>
  );
};
