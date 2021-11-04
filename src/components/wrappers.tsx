import styled, {css} from 'styled-components';

export const H1 = styled.h1`
  text-transform: capitalize;
  font-size: 3em;
  margin-bottom: 0.5em;
`;

export const FloatingCard = styled.div`
  background: rgba(221, 221, 221, 0.8);
  position: fixed;
  margin: ${(props) => props.theme.defaultPadding};
  padding: ${(props) => props.theme.defaultPadding};
  right: 15px;
  bottom: 15px;
  ${(props) => props.theme.boxShadow};
`;

export const FormRequiredFields = styled.div`
  &:before {
    content: '*Denotes Required Field';
  }
  margin-bottom: 1em;
`;

export const FormLabel = styled.label<{required?: boolean}>`
  display: block;
  font-size: 14px;
  margin-top: 2px;
  ${(props) => {
    const {required} = props;
    return `
      ${required && `&:after {content: '*'}`}
 
    `;
  }};
`;

export const NotificationMessage = styled.div<{
  type: NotificationType;
  boxShadow?: boolean;
  mb?: boolean;
}>`
  ${(props) => {
    const {
      type,
      boxShadow,
      theme: {
        borderRadius,
        padding,
        notificationStyles,
        boxShadow: boxShadowStyles,
        border,
      },
      mb,
    } = props;
    return css`
      background-color: #fff;
      box-sizing: border-box;
      margin-bottom: 6px;
      width: 100%;
      position: relative;
      z-index: 9;
      ${padding};
      ${borderRadius};
      ${border};
      ${boxShadow && boxShadowStyles};

      &:last-child {
        ${mb ? '' : `margin-bottom: 0;`};
      }

      & > button {
        position: absolute;
        top: 2px;
        right: -2px;
        background: transparent;
        border: none;
        cursor: pointer;
        color: inherit;
      }

      & > p {
        margin: 0 0 3px;
        display: block;

        &:last-child {
          margin-bottom: 0;
        }
      }

      $h4 {
        margin-top: 0;
        margin-bottom: 3px;
      }
      ${notificationStyles[type] || ''};
    `;
  }}
`;

export const H4 = styled.h4<{mb?: string; mt?: string}>`
  ${(props) => {
    const {mb, mt} = props;

    return css`
      margin: 0 0 4px;
      ${!mb && `margin-bottom: 0;`};
      ${!mt && `margin-top: 0;`};
    `;
  }};
`;
