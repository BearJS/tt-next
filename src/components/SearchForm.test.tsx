import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {store} from '../app/state/store';
import Sut from './SearchForm';

test('renders submit react button', () => {
  const {getByText} = render(
    <Provider store={store}>
      <Sut />
    </Provider>
  );

  expect(getByText(/Submit/i)).toBeInTheDocument();
});
