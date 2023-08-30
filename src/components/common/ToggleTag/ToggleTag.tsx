import React, { useEffect, useRef, useState } from 'react';
import { StTagWrapper } from './ToggleTag.styles';
import * as tagImg from 'assets/tags';
import { Tag } from '../Tag/Tag'; // make sure the path is correct
import { useHorizontalDragScroll } from 'hooks';

interface ToggleTagButtonProps {
  onTagChange?: (selectedTags: string[]) => void;
  initialSelectedTags?: string[];
  isWritePage?: boolean;
}

interface TagProps {
  id: number;
  img: string;
  label: string;
  isSelected: boolean;
}

export const ToggleTagButton: React.FC<ToggleTagButtonProps> = ({
  onTagChange,
  initialSelectedTags = [],
  isWritePage = false,
}) => {
  const wrapperRef = useRef(null);
  useHorizontalDragScroll(wrapperRef);
  useEffect(() => {
    const updatedTags = tags.map((tag) => ({
      ...tag,
      isSelected: initialSelectedTags.includes(tag.label),
    }));
    setTags(updatedTags);
  }, [initialSelectedTags, isWritePage]);

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

  const firstRowTags = tags.slice(0, Math.ceil(tags.length / 2));
  const secondRowTags = tags.slice(Math.ceil(tags.length / 2));

  return (
    <StTagWrapper ref={wrapperRef}>
      <div>
        {firstRowTags.map((tag) => (
          <Tag
            key={tag.id}
            text={tag.label}
            isSelected={tag.isSelected}
            onClick={() => toggleTag(tag)}
          />
        ))}
      </div>
      <div>
        {secondRowTags.map((tag) => (
          <Tag
            key={tag.id}
            text={tag.label}
            isSelected={tag.isSelected}
            onClick={() => toggleTag(tag)}
          />
        ))}
      </div>
    </StTagWrapper>
  );
};
