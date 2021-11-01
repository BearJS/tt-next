import styled, {css} from 'styled-components';

export const H1 = styled.h1`
  text-transform: capitalize;
  font-size: 3em;
  margin-bottom: 0.5em;
`;

export const NotificationMessage = styled.div<{
  type: NotificationType;
  boxShadow?: boolean;
}>`
  ${(props) => {
    const {
      type,
      boxShadow,
      theme: {borderRadius, padding, notificationStyles, boxShadowMenu, border},
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
      ${boxShadow && boxShadowMenu};

      &:last-child {
        margin-bottom: 0;
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

export const NotificationFixedContainer = styled.section`
  position: fixed;

  ${NotificationMessage} {
    right: 0;
  }
`;

export const FloatingCard = styled.div`
  background: rgba(221, 221, 221, 0.4);
  position: fixed;
  margin: ${(props) => props.theme.defaultPadding};
  padding: ${(props) => props.theme.defaultPadding};
  right: 15px;
`;
