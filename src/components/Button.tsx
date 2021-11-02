import React, {FC} from 'react';
import styled, {css} from 'styled-components';

const ButtonStyles = styled.button<ButtonStyleProps>`
  border: none;
  padding: 8px 6px;
  cursor: pointer;
  font-weight: bold;

  ${(props) => {
    const {
      theme: {borderRadius, anchorColor, defaultPadding, primaryColor, opacityDisabled},
      informationPanel,
      block,
      mb,
      mt,
      mr,
      ml,
      disabled,
      secondary,
      flex,
      anchor,
    } = props;
    return css`
      border: 2px solid ${primaryColor};
      background: ${primaryColor};
      color: white;
      text-decoration: none;
      ${borderRadius};
      ${secondary &&
      `
      color: ${primaryColor};
    border: 2px solid ${primaryColor};
    background-color: #ffffff;
    text-decoration: none;

    &:active {
      border-color: rgba(0, 0, 0, 0.2);
    }`};
      ${informationPanel && `border-radius: 0 3px 0 0;`}
      ${mb && `margin-bottom: ${defaultPadding};`}
      ${mt && `margin-top: ${defaultPadding}`}
      ${mr && `margin-right: ${defaultPadding}`}
      ${ml && `margin-left: ${defaultPadding}`}
      ${block && `display: block; width: 100%;`}
      ${flex && `display: flex;`}
      ${disabled && opacityDisabled}
      ${anchor &&
      `
    background: none;
    border: none;
    color: ${anchorColor};
    text-decoration: underline;
    padding: 0;
    cursor: pointer;
    font-size: 12px;
  `}
    `;
  }};
`;

const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    handleClick,
    label,
    informationPanel,
    block,
    mt,
    mb,
    mr,
    ml,
    disabled,
    title,
    secondary,
    flex,
    anchor,
    type,
  } = props;
  return (
    <ButtonStyles
      title={title}
      onClick={handleClick}
      mt={mt}
      mb={mb}
      mr={mr}
      ml={ml}
      informationPanel={informationPanel}
      block={block}
      disabled={disabled}
      secondary={secondary}
      flex={flex}
      anchor={anchor}
      type={type || 'button'}
    >
      {children || label}
    </ButtonStyles>
  );
};

export default Button;
