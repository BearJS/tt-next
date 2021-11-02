import {ThemeProvider, createGlobalStyle, css} from 'styled-components';
import React, {FC} from 'react';

const notificationColors: {
  [key in NotificationType]: {color: string; bg: string; border: string};
} = {
  primary: {
    color: '#084298',
    bg: '#cfe2ff',
    border: '#b6d4fe',
  },
  secondary: {
    color: '#41464b',
    bg: '#e2e3e5',
    border: '#d3d6d8',
  },
  success: {
    color: '#0f5132',
    bg: '#d1e7dd',
    border: '#badbcc',
  },
  error: {
    color: '#842029',
    bg: '#f8d7da',
    border: '#f5c2c7',
  },
  warning: {
    color: '#664d03',
    bg: '#fff3cd',
    border: '#ffecb5',
  },
  info: {
    color: '#055160',
    bg: '#cff4fc',
    border: '#b6effb',
  },
  light: {
    color: '#636464',
    bg: '#fefefe',
    border: '#fdfdfe',
  },
  dark: {
    color: '#141619',
    bg: '#d3d3d4',
    border: '#bcbebf',
  },
};

export const baseColors = {
  primaryColor: '#E55F4C',
  yellow: '#FFEFD5',
  ...notificationColors,
  grey: '#ddd',
  anchorColor: 'blue',
};

export const baseStyles = {
  defaultPadding: '12px;',
  border: `border: 1px solid ${baseColors.grey};`,
  padding: 'padding: 12px;',
  borderRadius: `border-radius: 3px;`,
  opacityDisabled: `opacity: 0.50;`,
  boxShadow: `box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),0px 1px 3px 0px rgb(0 0 0 / 12%);`,
  formFieldFocus: `
    &:focus,
    &:focus-within,
    &:focus-visible {
      border: 2px solid ${baseColors.primaryColor} !important;
      outline: ${baseColors.primaryColor} auto 2px;
    }
  `,
};

export const theme = {
  ...baseColors,
  ...baseStyles,
  notificationStyles: Object.fromEntries(
    new Map(
      Object.keys(notificationColors).map((type) => {
        const {color, bg, border} = notificationColors[type as NotificationType];
        return [
          type,
          `
            color: ${color};
            background: ${bg};
            border: 1px solid ${border};
          `,
        ];
      })
    )
  ),
  input: css<FieldStyleProps>`
    display: block;
    width: 100%;
    font-size: 14px;
    padding: 5px 3px;
    margin-bottom: 8px;
    ${baseStyles.borderRadius};
    border: 2px solid ${baseColors.grey};

    ${(props) => (props.readOnly || props.disabled) && `background: ${baseColors.grey}`}
  `,
};

const GlobalStyle = createGlobalStyle`
  body {
    font-size: 12px;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
    &:before,
    &:after {
      box-sizing: border-box;
    }
  }
  
  sup {
    line-height: 0;
    font-size: 0.83em;
    vertical-align: super;
  }

  code, pre {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
    ${baseStyles.borderRadius};
  }
  
  code {
    background: ${baseColors.grey};
    padding: 2px 3px;
  }
  pre {
    background: ${baseColors.yellow};
    padding: ${baseStyles.defaultPadding};
  }
  
  input {
    &:focus,
    &:focus-within,
    &:focus-visible {
      border: 2px solid ${baseColors.primaryColor} !important;
      outline: ${baseColors.primaryColor} auto 2px;
    }
  }
`;

const Styles: FC = ({children}) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);
export default Styles;
