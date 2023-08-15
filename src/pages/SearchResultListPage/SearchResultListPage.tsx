import React, { useState, useEffect } from 'react';
import { CommonLayout, FixFooter, NavBar } from 'components/layout';
import { ThumbnailWrapper } from 'components/homePage';
import { ToggleTagButton } from 'components/common/ToggleTag/ToggleTag';
import { useVerifyUser } from 'hooks';
import { useRecoilValue } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Search } from 'assets/icons/Search.svg';

export const SearchResultListPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get('q');

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
          <NavBar btnLeft={'logo'} btnRight={'mypage'}>
            <h1>
              <Search width="18" height="18" />
              {q}
            </h1>
          </NavBar>
        </>
      }
      footer={<FixFooter centerButtons={'map'} rightButtons={'goTop'} />}
    >
      <ToggleTagButton onTagChange={handleTagChange} />

      <ThumbnailWrapper
        tag={selectedTags.length > 0 ? selectedTags.join(',') : null}
        isSearch={true}
        q={q}
      />
    </CommonLayout>
  );
};
