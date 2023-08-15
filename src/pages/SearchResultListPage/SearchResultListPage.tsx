import React from 'react';
import { ReviewsProps, ThumbnailWrapper } from 'components/homePage';

// export interface SearchReviewsProps extends MainReviewsProps {
//   q: string | null;
// }

export const SearchResultListPage = ({ ...props }: ReviewsProps) => {
  return (
    <>
      <ThumbnailWrapper
        {...props}
        // tag={selectedTags.length > 0 ? selectedTags.join(',') : null}
        // isSearch={true}
        // q={q}
      />
    </>
  );
};
