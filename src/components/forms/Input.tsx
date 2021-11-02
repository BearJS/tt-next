import React, {FC} from 'react';
import styled from 'styled-components';
import FieldFeedback from './FieldFeedback';
import {FormLabel} from '../wrappers';

const InputWrapper = styled.input`
  ${(props) => props.theme.input};
`;

const Input: FC<InputProps<string | number>> = (props) => {
  const {
    placeholder,
    name,
    label,
    disabled,
    value,
    type,
    min,
    max,
    readOnly,
    required,
    description,
    handleChange,
    error,
    id,
    handleBlur,
  } = props;

  const descriptionId = description ? `${id}_description` : '';
  return (
    <>
      <FormLabel htmlFor={id} required={required}>
        {label}
      </FormLabel>
      <InputWrapper
        placeholder={placeholder}
        id={id}
        readOnly={readOnly}
        name={name || id}
        disabled={disabled}
        value={value}
        min={min}
        max={max}
        type={type || 'text'}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-describedby={descriptionId}
      />
      {description && (
        <FieldFeedback
          descriptionId={descriptionId}
          error={error}
          description={description}
        />
      )}
    </>
  );
};

export default Input;
