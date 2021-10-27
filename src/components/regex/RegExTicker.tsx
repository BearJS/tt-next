import React, {FC} from 'react';

interface Props {
  regex: RegExp;
  value: string;
}

const RegExTicker: FC<Props> = ({regex, value, children}) => {
  if (regex.test(value)) {
    return <span>✅ {children}</span>;
  }
  return <span>❌ {children}</span>;
};

export default RegExTicker;
