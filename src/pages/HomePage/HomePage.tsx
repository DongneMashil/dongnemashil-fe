import React, { useState, useEffect } from 'react';
import { CommonLayout, NavBar } from 'components/layout';
import { ThumbnailWrapper } from 'components/homePage';
import { ToggleTagButton } from 'components/common/ToggleTag/ToggleTag';
import { useVerifyUser } from 'hooks';
import { useRecoilValue } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';

export const HomePage = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (tags: string[]) => {
    setSelectedTags(tags);
  };
  const userState = useRecoilValue(userProfileSelector);
  const { data } = useVerifyUser(true);

  useEffect(() => {
    console.log('current user state: ', userState);
    if (data) {
      console.log('useVerifyUser data: ', data);
    }
  }, [userState]);

  return (
    <CommonLayout
      header={
        <>
          <NavBar
            btnLeft={'logo'}
            btnSecondRight={'search'}
            btnRight={'mypage'}
          ></NavBar>
          <ToggleTagButton onTagChange={handleTagChange} />
        </>
      }
      headerHeight={'150px'}
    >
      <ThumbnailWrapper selectedTags={selectedTags} />
    </CommonLayout>
  );
};
