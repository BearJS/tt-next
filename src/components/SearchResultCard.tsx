import * as React from 'react';
import {FC, useState} from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const SearchResultCard: FC<{data: iTunesSearchResult}> = ({data}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </Container>
  );
};

export default SearchResultCard;
