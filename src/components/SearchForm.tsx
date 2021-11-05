import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Fieldset from './Fieldset';
import useForm from '../hooks/useForm';
import Input from './Input';
import Button from './Button';
import {FormRequiredFields, H1} from './wrappers';
import {useAppDispatch, useAppSelector} from '../hooks/useRedux';
import {fetchTracks} from '../state/searchReducer';
import SearchResultCard from './SearchResultCard';
import SearchStatus from './SearchStatus';
import useScrollToBottom from '../hooks/useScrollToBottom';
import Notifications from './Notifications';

const FormStyles = styled.form`
  margin: ${(props) => props.theme.defaultPadding};
  padding: ${(props) => props.theme.defaultPadding};
  border: 2px solid #ddd;
  border-radius: 3px;
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: ${(props) => props.theme.defaultPadding};
`;

interface FormValues {
  term: string;
}

const initialFormValues: FormValues = {
  term: '',
};

const defaultLimit = 10;

const SearchForm = () => {
  const dispatch = useAppDispatch();
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
      // Each time we scroll to the bottom of the page and we have a search term in the state and the limit is below 200, we want to increment the limit
      if (term && limit < 200) {
        setLimit((prevCount) => prevCount + defaultLimit);
      }
    },
    dep: [term, limit],
  });

  // Incrementing the limit will trigger the search
  useEffect(() => {
    if (term) {
      dispatch(fetchTracks({term, limit: `${limit}`}));
    }
  }, [limit]);

  const handleClick = (): void => {
    dispatch(fetchTracks({term, limit: `${defaultLimit}`}));
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
      <SearchStatus
        currentLimit={limit}
        defaultLimit={defaultLimit}
        term={term}
        resultsCount={resultsCount}
        isLoading={isLoading}
      />
      <Grid>
        {results.map((i: iTunesSearchResult) => (
          <SearchResultCard
            data={i}
            key={`${i.kind}-${i.trackId}-${i.artistId}-${i.collectionId}`}
          />
        ))}
      </Grid>
    </FormStyles>
  );
};

export default SearchForm;
