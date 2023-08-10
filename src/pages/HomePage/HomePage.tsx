import React, { useState } from 'react';
// import React, { useCallback, useState, useEffect } from 'react';
import { CommonLayout, NavBar } from 'components/layout';
import { ThumbnailWrapper } from 'components/homePage';
import { ToggleTagButton } from 'components/common/ToggleTag/ToggleTag';

// import { useVerifyUser } from 'hooks';

export const HomePage = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (tags: string[]) => {
    setSelectedTags(tags);

    // const [shouldVerify, setShouldVerify] = useState(false);

    // const { data } = useVerifyUser(shouldVerify);

    // const onVerifyHandler = useCallback(() => {
    //   setShouldVerify(true);
    // }, []);

    // useEffect(() => {
    //   if (data) console.log(data);
    // }, []);
  };

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
      filter={true}
      headerHeight={'200px'}
    >
      <ThumbnailWrapper selectedTags={selectedTags} />
    </CommonLayout>
  );
};
