import React, {FC} from 'react';
import {FormLabel} from './wrappers';
import {getDescriptionId} from './utils';
import FieldFeedback from './FieldFeedback';

const Checkbox: FC<CheckboxProps> = (props) => {
  const {
    name,
    label,
    disabled,
    value,
    checked,
    required,
    description,
    fieldPropsFromForm: {handleBlur, handleChange, error, id},
  } = props;
  const val = value || id;

  const descriptionId = getDescriptionId(id, description);
  return (
    <>
      <FormLabel htmlFor={id} required={required}>
        <input
          id={id}
          name={name || id}
          disabled={disabled}
          value={val}
          type="checkbox"
          onBlur={handleBlur}
          onChange={handleChange}
          checked={checked}
        />
        {label}
      </FormLabel>
      <FieldFeedback
        descriptionId={descriptionId}
        error={error}
        description={description}
      />
    </>
  );
};

export default Checkbox;
