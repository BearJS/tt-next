import React from 'react';
import {Provider} from 'react-redux';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {store} from '../../state/store';
import SutComponent from '../SearchForm';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {useAppSelectorMock} from '../../mocks/useReduxMock';

let sut;
let input;
let button;

jest.mock('../../hooks/useRedux');

const setup = () => {
  useAppSelector.mockImplementation(useAppSelectorMock);
  // need to do this as we are calling const dispatch = useAppDispatch() in our component
  useAppDispatch.mockImplementation(() => jest.fn);

  sut = render(
    <Provider store={store}>
      <SutComponent />
    </Provider>
  );
  input = screen.getByLabelText('Search Term');
  button = sut.getByText(/Submit/i);
};

const tearDown = () => {
  jest.clearAllMocks();
};

const mimicSearch = (value: string) => {
  fireEvent.change(input, {target: {value: 'Harry Potter'}});
  userEvent.click(button);
};

describe('SearchForm', () => {
  beforeEach(() => {
    setup();
  });
  afterEach(() => {
    tearDown();
  });

  describe('render', () => {
    it('renders submit button', () => {
      expect(button).toBeInTheDocument();
    });
    it('renders an input for the search term', () => {
      expect(input).toBeInTheDocument();
    });
  });

  describe('Given I am using the search form', () => {
    describe('When I conduct a search', () => {
      describe('If there are results', () => {
        it('Then should be able to see the results returning matching Artists, Albums, and/or Songs', () => {
          mimicSearch('harry potter');
          expect(useAppDispatch).toHaveBeenCalled();
          expect(input).toBeInTheDocument();
        });
        it('And the results should be limited to 10 items at a time', () => {
          expect(input).toBeInTheDocument();
        });
        it('And when I scroll down, another 10 items should be revealed', () => {
          expect(input).toBeInTheDocument();
        });
      });
      describe('If there are NO results', () => {
        it('I should be notified that there are no results', () => {
          expect(input).toBeInTheDocument();
        });
      });
    });
  });
});
