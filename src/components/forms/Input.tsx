import React, {FC} from 'react';
import styled from 'styled-components';
import FieldFeedback from './FieldFeedback';
import {FormLabel} from './wrappers';
import {getDescriptionId} from './utils';

const InputWrapper = styled.input`
  ${(props) => props.theme.input};
`;

interface Props extends InputProps<string | number> {
  type?: 'text' | 'number' | 'password' | 'date';
  min?: string | number;
  max?: string | number;
}

const Input: FC<Props> = (props) => {
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
    fieldPropsFromForm: {handleBlur, handleChange, error, id},
  } = props;

  const descriptionId = getDescriptionId(id, description);

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
      <FieldFeedback
        descriptionId={descriptionId}
        error={error}
        description={description}
      />
    </>
  );
};

export default Input;
