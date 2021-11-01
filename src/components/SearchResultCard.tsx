import * as React from 'react';
import {FC, useState} from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div<{kind: string}>`
  display: flex;
  flex-wrap: wrap;
  ${(props) => props.theme.border};
  margin-bottom: 8px;
  padding: 1em;
  ${(props) => {
    let background = '';

    switch (props.kind) {
      case 'song':
        background = `background: ${props.theme.notificationStyles.primary};`;
        break;
      case 'feature-movie':
        background = `background: ${props.theme.notificationStyles.secondary};`;
        break;
      default:
        background = `background: ${props.theme.notificationStyles.dark};`;
        break;
    }

    return background;
  }}

  .img-container {
    width: 100px;
    flex: 0 1 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;

    img {
      max-height: 100px;
      max-width: 100px;
    }
  }

  dl {
    flex: 1 1 auto;

    dt {
      font-weight: bold;
      text-transform: capitalize;
    }

    dd {
      margin: 0;
    }
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

  const {artistName, collectionName, trackName, artworkUrl100, kind, releaseDate} = data;
  return (
    <Container kind={kind}>
      <div className="img-container">
        <img
          src={artworkUrl100}
          alt={`Artwork for ${artistName} - ${collectionName} - ${trackName}`}
        />
      </div>
      <dl>
        <ListItem fieldName="artist" value={artistName} />
        <ListItem fieldName="collection" value={collectionName} />
        <ListItem fieldName="track" value={trackName} />
        <ListItem fieldName="kind" value={kind} />
        <ListItem
          fieldName="release date"
          value={releaseDate && moment(releaseDate).format('dddd, Do MMMM YYYY')}
        />
      </dl>
    </Container>
  );
};

export default SearchResultCard;
