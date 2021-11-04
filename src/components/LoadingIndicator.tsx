import React, {FC} from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';
import {FloatingCard} from './wrappers';

const LoadingMessage = styled(FloatingCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingIndicator: FC<{message?: string}> = ({message}) => (
  <LoadingMessage role="alert">
    <Spinner />
    <div>{message || 'Loading...'}</div>
  </LoadingMessage>
);

export default LoadingIndicator;
