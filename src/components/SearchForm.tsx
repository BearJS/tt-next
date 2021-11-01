import React from 'react';
import styled from 'styled-components';
import Fieldset from './forms/Fieldset';
import useForm from './forms/useForm';
import Input from './forms/Input';
import Button from './forms/Button';
import {H1} from './wrappers';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {searchByArtistCollectionSong} from '../features/search/searchReducer';
import {AppDispatch} from '../app/store';
import SearchResultCard from './SearchResultCard';
import LoadingIndicator from './LoadingIndicator';

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

const SearchForm = () => {
  const dispatch: AppDispatch = useAppDispatch();
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

  const {term} = formValues;

  const handleClick = (): void => {
    console.log(formValues);
    dispatch(searchByArtistCollectionSong({term, limit: '10'}));
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
        <Button handleClick={handleClick}>Submit</Button>
      </Fieldset>
      {loading === 'pending' && (
        <LoadingIndicator message={`Retrieving results form search term ${term}`} />
      )}
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
