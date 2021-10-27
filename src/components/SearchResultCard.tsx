import * as React from 'react';
import {FC, useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  ${(props) => props.theme.border};
  margin-bottom: 8px;
  padding: 1em;
`;

const Tag = styled.span<{wrapperType: iTunesWrapperType}>`
  ${(props) => props.theme.border};
  ${(props) => props.theme.borderRadius};
  padding: 2px;
  margin-bottom: 3px;
  ${(props) =>
    props.wrapperType === 'track' &&
    `background: ${props.theme.notificationStyles.success};`};
  ${(props) =>
    props.wrapperType === 'collection' &&
    `background: ${props.theme.notificationStyles.warning};`};
  ${(props) =>
    props.wrapperType === 'artist' &&
    `background: ${props.theme.notificationStyles.error};`};
`;

const SearchResultCard: FC<{data: iTunesSearchResult}> = ({data}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {artistName, collectionName, trackName, wrapperType} = data;
  return (
    <Container>
      <Tag wrapperType={wrapperType}>{wrapperType}</Tag>
      <img src="" alt="" />
      <p>
        <strong>Artist:</strong> {artistName}
      </p>
      <p>
        <strong>Collection:</strong> {collectionName}
      </p>
      <p>
        <strong>Track:</strong> {trackName}
      </p>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </Container>
  );
};

export default SearchResultCard;
