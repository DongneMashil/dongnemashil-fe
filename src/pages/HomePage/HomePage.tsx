import React, { useState, useEffect } from 'react';
import { CommonLayout, FixFooter, NavBar } from 'components/layout';
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
  console.log(selectedTags);

  return (
    <CommonLayout
      header={
        <>
          <NavBar
            btnLeft={'logo'}
            btnSecondRight={'search'}
            btnRight={'mypage'}
          >
            <h1>서울 전체</h1>
          </NavBar>
          <ToggleTagButton onTagChange={handleTagChange} />
        </>
      }
      headerHeight={'150px'}
      footer={<FixFooter rightButtons={'write'} />}
    >
      <ThumbnailWrapper
        tag={selectedTags.length > 0 ? selectedTags.join(',') : null}
        isSearch={false}
      />
    </CommonLayout>
  );
};
