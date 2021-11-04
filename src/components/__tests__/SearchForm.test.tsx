import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {store} from '../../app/providers/redux/store';
import SutComponent from '../SearchForm';

let sut;

describe('SearchForm', () => {
  beforeEach(() => {
    console.log('called');
    sut = render(
      <Provider store={store}>
        <SutComponent />
      </Provider>
    );
  });

  describe('render', () => {
    test('renders submit button', () => {
      const {getByText} = sut;

      expect(getByText(/Submit/i)).toBeInTheDocument();
    });
    test('renders input', () => {
      const {getByRole} = sut;

      expect(getByRole('input', {name: 'term'})).toBeInTheDocument();
    });
  });

  describe('Given I am using the search form', () => {
    describe('When I conduct a search', () => {
      describe('If there are results', () => {
        it('Then should be able to see the results returning matching Artists, Albums, and/or Songs', () => {
          const {getByRole} = sut;

          expect(getByRole('input', {name: 'term'})).toBeInTheDocument();
        });
        it('And the results should be limited to 10 items at a time', () => {
          const {getByRole} = sut;

          expect(getByRole('input', {name: 'term'})).toBeInTheDocument();
        });
        it('And when I scroll down, another 10 items should be revealed', () => {
          const {getByRole} = sut;

          expect(getByRole('input', {name: 'term'})).toBeInTheDocument();
        });
      });
      describe('If there are NO results', () => {
        it('I should be notified that there are no results', () => {
          const {getByRole} = sut;

          expect(getByRole('input', {name: 'term'})).toBeInTheDocument();
        });
      });
    });
  });
});
