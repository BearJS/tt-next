import * as React from 'react';
import {FC, useState} from 'react';
import styled from 'styled-components';

const Container = styled.div<{wrapperType: iTunesWrapperType}>`
  display: flex;
  ${(props) => props.theme.border};
  margin-bottom: 8px;
  padding: 1em;
  ${(props) =>
    props.wrapperType === 'track' &&
    `background: ${props.theme.notificationStyles.primary};`};
  ${(props) =>
    props.wrapperType === 'collection' &&
    `background: ${props.theme.notificationStyles.info};`};
  ${(props) =>
    props.wrapperType === 'artist' &&
    `background: ${props.theme.notificationStyles.secondary};`};

  img {
    height: 100px;
    width: 100px;
    margin-right: 10px;
  }
`;

const SearchResultCard: FC<{data: iTunesSearchResult}> = ({data}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {artistName, collectionName, trackName, wrapperType, artworkUrl100, kind} = data;
  return (
    <Container wrapperType={wrapperType}>
      <img
        src={artworkUrl100}
        alt={`Artwork for ${artistName} - ${collectionName} - ${trackName}`}
      />
      <div>
        <p>
          <strong>Artist:</strong> {artistName}
        </p>
        <p>
          <strong>Collection:</strong> {collectionName}
        </p>
        <p>
          <strong>Track:</strong> {trackName}
        </p>
        <p>
          <strong>Kind: </strong>
          {kind}
        </p>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </div>
    </Container>
  );
};

export default SearchResultCard;
