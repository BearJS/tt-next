import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Fieldset from './Fieldset';
import useForm from '../hooks/useForm';
import Input from './Input';
import Button from './Button';
import {FloatingCard, FormRequiredFields, H1} from './wrappers';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {searchByArtistCollectionSong} from '../app/state/searchReducer';
import {AppDispatch} from '../app/state/store';
import SearchResultCard from './SearchResultCard';
import LoadingIndicator from './LoadingIndicator';
import useScrollToBottom from '../hooks/useScrollToBottom';
import Notifications from './notifications/Notifications';

const FormStyles = styled.form`
  margin: ${(props) => props.theme.defaultPadding};
  padding: ${(props) => props.theme.defaultPadding};
  border: 2px solid #ddd;
  border-radius: 3px;
`;

interface FormValues {
  term: string;
}

const initialFormValues: FormValues = {
  term: '',
};

const defaultLimit = 10;

const SearchForm = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const [limit, setLimit] = useState(defaultLimit);
  const {results, loading} = useAppSelector((state) => state.search);
  const {formValues, handleChange} = useForm<FormValues>({
    initialFormValues,
  });

  const isLoading = loading === 'pending';

  const {term} = formValues;
  const resultsCount = results.length;
  useScrollToBottom({
    handleScrolledToBottom: (): void => {
      if (term && limit < 200) {
        console.log('has term');
        setLimit((prevCount) => prevCount + defaultLimit);
      }
    },
    dep: [term, limit],
  });
  useEffect(() => {
    if (term && resultsCount !== 200) {
      dispatch(searchByArtistCollectionSong({term, limit: `${limit}`}));
    }
  }, [limit]);

  const handleClick = (): void => {
    dispatch(searchByArtistCollectionSong({term, limit: `${defaultLimit}`}));
    setLimit(defaultLimit);
  };

  return (
    <FormStyles
      onSubmit={(e) => {
        e.preventDefault();
        handleClick();
      }}
    >
      <H1>🎵 Find Your Favourite Tunes 🎵</H1>
      <Notifications />
      <FormRequiredFields />
      <Fieldset legend="Search by artist, album or song">
        <Input
          handleChange={handleChange}
          id="term"
          label="Search Term"
          value={term}
          required
        />
        <Button handleClick={handleClick} disabled={isLoading || !term}>
          Submit
        </Button>
      </Fieldset>
      {isLoading && (
        <LoadingIndicator message={`Retrieving results form search term: "${term}"`} />
      )}
      {!isLoading && resultsCount ? (
        <FloatingCard>
          <dl>
            <dt>Search Term</dt>
            <dd>{term}</dd>
            <dt>Num. of Results</dt>
            <dd>{resultsCount}</dd>
          </dl>
        </FloatingCard>
      ) : null}
      {results.map((i: iTunesSearchResult) => (
        <SearchResultCard
          data={i}
          key={`${i.kind}-${i.trackId}-${i.artistId}-${i.collectionId}`}
        />
      ))}
    </FormStyles>
  );
};

export default SearchForm;
