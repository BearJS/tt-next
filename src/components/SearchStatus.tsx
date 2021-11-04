/**
 * Component to display a loading indicator when the search is in progress and the search results summary when the seach has completed
 * */

import React, {FC} from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';
import {FloatingCard} from './wrappers';

const LoadingMessage = styled(FloatingCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchStatus: FC<{
  term: string;
  resultsCount: number;
  isLoading: boolean;
  currentLimit: number;
  defaultLimit: number;
}> = ({term, isLoading, resultsCount, currentLimit, defaultLimit}) => {
  if (isLoading) {
    return (
      <LoadingMessage role="alert">
        <Spinner />
        <div>
          Retrieving{currentLimit > defaultLimit ? ' more ' : ' '}results for search term:
          &quot;{term}
          &quot;
        </div>
      </LoadingMessage>
    );
  }

  if (resultsCount) {
    return (
      <FloatingCard>
        <dl>
          <dt>Search Term</dt>
          <dd>{term}</dd>
          <dt>Num. of Results</dt>
          <dd>{resultsCount}</dd>
        </dl>
      </FloatingCard>
    );
  }

  return null;
};

export default SearchStatus;
