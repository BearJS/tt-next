import React, {FC} from 'react';

const LoadingIndicator: FC<{message?: string}> = ({message}) => {
  return <div>{message || 'Loading...'}</div>;
};

export default LoadingIndicator;
