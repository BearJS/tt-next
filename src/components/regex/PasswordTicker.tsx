import React, {FC} from 'react';
import styled from 'styled-components';
import RegExTicker from './RegExTicker';
import {
  minimumLength8Regex,
  oneDigitRegex,
  oneLowerCaseRegex,
  oneSpecialCharacterRegex,
  oneUpperCaseRegex,
} from './utils';

const TickerList = styled.section`
  ${(props) => props.theme.borderRadius};
  ${(props) => props.theme.padding};
  background: ${(props) => props.theme.yellow};
  ul {
    padding-left: 30px;
    margin-bottom: 0;
  }
  li {
    list-style: none;
  }
`;

const PasswordTicker: FC<{password: string}> = ({password}) => (
  <TickerList>
    The password must meet the following requirements:
    <ul>
      <li>
        <RegExTicker regex={oneUpperCaseRegex} value={password}>
          At least one upper case English letter,
        </RegExTicker>
      </li>
      <li>
        <RegExTicker regex={oneLowerCaseRegex} value={password}>
          At least one lower case English letter,
        </RegExTicker>
      </li>
      <li>
        <RegExTicker regex={oneDigitRegex} value={password}>
          At least one digit,
        </RegExTicker>
      </li>
      <li>
        <RegExTicker regex={oneSpecialCharacterRegex} value={password}>
          At least one special character,
        </RegExTicker>
      </li>
      <li>
        <RegExTicker regex={minimumLength8Regex} value={password}>
          Minimum eight in length (with the anchors)
        </RegExTicker>
      </li>
    </ul>
  </TickerList>
);

export default PasswordTicker;
