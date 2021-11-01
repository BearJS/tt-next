import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Fieldset from './forms/Fieldset';
import useForm from './forms/useForm';
import Input from './forms/Input';
import Button from './forms/Button';
import {FloatingCard, H1} from './wrappers';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {searchByArtistCollectionSong} from '../features/search/searchReducer';
import {AppDispatch} from '../app/store';
import SearchResultCard from './SearchResultCard';
import LoadingIndicator from './LoadingIndicator';
import useScrollToBottom from './scroll/useScrollToBottom';

const FormStyles = styled.form`
  margin: ${(props) => props.theme.defaultPadding};
  padding: ${(props) => props.theme.defaultPadding};
  border: 2px solid #ddd;
  border-radius: 3px;
`;

const ResultsCounter = styled(FloatingCard)`
  display: inline-block;
  top: 15px;
`;

interface FormValues {
  term: string;
}

const initialFormValues: FormValues = {
  term: '',
};

const SearchForm = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const [resultsCount, setResultsCount] = useState(10);
  const {results, loading} = useAppSelector((state) => state.search);
  const {
    formValues,
    formMethods: {getFieldPropsFromForm},
  } = useForm<FormValues>({
    initialFormValues,
    validators: {
      search: (value) =>
        !value ? 'Please enter a search term, i.e. an artist, album or song' : undefined,
    },
    opts: {
      validateOnBlur: true,
    },
  });

  const isLoading = loading === 'pending';

  const {term} = formValues;

  useScrollToBottom({
    handleScrolledToBottom: (): void => {
      if (resultsCount < 200) {
        setResultsCount((prevCount) => prevCount + 10);
      }
    },
  });
  useEffect(() => {
    dispatch(searchByArtistCollectionSong({term, limit: `${resultsCount}`}));
  }, [resultsCount]);

  const handleClick = (): void => {
    dispatch(searchByArtistCollectionSong({term, limit: '10'}));
    setResultsCount(10);
  };

  return (
    <FormStyles
      onSubmit={(e) => {
        e.preventDefault();
        handleClick();
      }}
    >
      <H1>🎵 Find Your Favourite Tunes 🎵</H1>
      <Fieldset legend="Search by artist, album or song">
        <Input
          fieldPropsFromForm={getFieldPropsFromForm('term')}
          label="Search Term"
          value={term}
        />
        <Button handleClick={handleClick} disabled={isLoading}>
          Submit
        </Button>
      </Fieldset>
      {isLoading && (
        <LoadingIndicator message={`Retrieving results form search term: "${term}"`} />
      )}
      <ResultsCounter>Results: {results.length}</ResultsCounter>
      {results.map((i: iTunesSearchResult) => (
        <SearchResultCard
          data={i}
          key={`${i.kind}-${i.trackId}-${i.artistId}-${i.collectionId}`}
        />
      ))}
      {results.length === 200 && (
        <div>
          You have reached the search limit of 200 results. No more tracks will be
          displayed. Please refine your search if you do not see the result you are after.
        </div>
      )}
    </FormStyles>
  );
};

export default SearchForm;
