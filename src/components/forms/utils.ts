/**
 * Used to generate a identifier for the description field of a form field.
 * This is used by assistive technologies such as screen readers to link the contextual information
 * to the relevant input
 */
export const getDescriptionId = (
  id: string,
  description?: React.ReactFragment
): string => {
  if (description) {
    return `${id}_description`;
  }
  return '';
};

/**
 * Labels and values of selects do not always match up.
 * We may wish to display elsewhere the selected option but
 * will use the label which is displayed to the user rather than the value itself.
 */
export const getSelectLabelBySelectValue = (
  value: FormValue,
  options: SelectOption[]
): string => {
  if (!value) {
    return '';
  }

  const option = options.find((item) => value === item.value);

  if (!option) {
    return '';
  }
  return option.label;
};

/**
 * Used to get an object of all the fields which have change from the initial values
 * @param formValues current form values
 * @param initialValues form values initially passed to form
 */
export const getDirtyFields = <FormValues>(
  formValues: FormValues,
  initialValues: FormValues
): FieldStatuses => {
  const fields: FieldStatuses = {};

  Object.entries(initialValues).forEach((i) => {
    const [key, value] = i;

    fields[key as string] = value !== formValues[key as keyof FormValues];
  });

  return fields;
};

export const getFieldErrorSummary = (fieldErrors: FieldErrors): ErrorSummary => {
  const errorCount = Object.values(fieldErrors).filter((x) => x !== undefined).length;

  return {
    hasErrors: !!errorCount,
    errorCount,
  };
};

export const getFieldErrors = <FormValues>(
  formValues: FormValues,
  validators: FieldValidators<FormValues>
): {fieldErrors: FieldErrors; errorSummary: ErrorSummary} => {
  const fieldErrors: FieldErrors = {};

  if (validators) {
    Object.entries(validators).forEach((i) => {
      const [key, validator] = i;
      const value = formValues[key as keyof FormValues];
      fieldErrors[key] = validator(value);
    });
  }

  return {fieldErrors, errorSummary: getFieldErrorSummary(fieldErrors)};
};
