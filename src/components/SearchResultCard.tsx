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

  dt {
    font-weight: bold;
  }

  dd {
    margin: 0;
  }
`;

const ListItem: FC<{fieldName: string; value: string}> = ({fieldName, value}) => (
  <>
    <dt>{fieldName}</dt>
    <dd>{value || '-'}</dd>
  </>
);

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
      <dl>
        <ListItem fieldName="Artist" value={artistName} />
        <ListItem fieldName="Collection" value={collectionName} />
        <ListItem fieldName="Track" value={trackName} />
        <ListItem fieldName="Kind" value={kind} />
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </dl>
    </Container>
  );
};

export default SearchResultCard;
