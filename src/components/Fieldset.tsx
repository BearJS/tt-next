import React, {FC} from 'react';
import styled from 'styled-components';

const FieldsetStyles = styled.fieldset<FieldsetStyleProps>`
  margin-bottom: ${(props) => props.theme.defaultPadding};
  ${(props) => props.theme.border};
  ${(props) => props.disabled && props.theme.opacityDisabled};
  ${(props) => props.inline && `display: flex;`};
`;

const Legend = styled.legend`
  color: ${(props) => props.theme.primaryColor};
  font-size: 16px;
  font-weight: bold;
  text-transform: capitalize;
`;

const Fieldset: FC<FieldsetProps> = ({legend, inline, children, disabled}) => (
  <FieldsetStyles inline={inline} disabled={disabled}>
    <Legend>{legend}</Legend>
    {children}
  </FieldsetStyles>
);

export default Fieldset;
