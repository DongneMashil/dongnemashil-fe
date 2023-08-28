import React from 'react';
import {
  StCurrentAddress,
  StCurrentAddressWrapper,
  StPurpleMarker,
  StTagContainer,
  StTotalTag,
} from './TagContainer.styles';
import { ToggleTagButton } from 'components/common';

interface TagProps {
  selectedTags: string[];
  handleTagChange: (tags: string[]) => void;
  addressData: { roadName: string };
  onGoToWriteMapPageHandler: () => void;
}

export const TagContainer: React.FC<TagProps> = ({
  selectedTags,
  handleTagChange,
  addressData,
  onGoToWriteMapPageHandler,
}) => {
  return (
    <StTagContainer>
      <StCurrentAddressWrapper>
        <div onClick={onGoToWriteMapPageHandler}>
          <StPurpleMarker />
          <StCurrentAddress>{addressData.roadName}</StCurrentAddress>
        </div>
        <StTotalTag>{selectedTags.length}개 선택</StTotalTag>
      </StCurrentAddressWrapper>
      <ToggleTagButton
        isWritePage={true}
        onTagChange={handleTagChange}
        initialSelectedTags={selectedTags}
      />
    </StTagContainer>
  );
};
