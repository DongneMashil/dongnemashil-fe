import React, { useState } from 'react';
import { StTagBox, StTagWrapper } from './ToggleTag.styles';
interface ToggleTagButtonProps {
  // initialTags?: string[];
  onTagChange?: (selectedTags: string[]) => void;
}

export const ToggleTagButton: React.FC<ToggleTagButtonProps> = ({
  // initialTags = [],
  onTagChange,
}) => {
  const tags = [
    '한적',
    '연인',
    '동물',
    '사진',
    '아기',
    '자전거',
    '비',
    '밤',
    '그늘',
    '화장실',
    '자연',
    '벤치',
  ];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(updatedTags);
    onTagChange && onTagChange(updatedTags);
  };

  const onTagClick = (tag: string) => () => {
    toggleTag(tag);
  };

  return (
    <StTagWrapper>
      {tags.map((tag) => (
        <StTagBox
          key={tag}
          onClick={onTagClick(tag)}
          $isSelected={selectedTags.includes(tag)}
        >
          {tag}
        </StTagBox>
      ))}
    </StTagWrapper>
  );
};
