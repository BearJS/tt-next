import {useEffect, useState} from 'react';
import {getDirtyFields, getFieldErrors, getFieldErrorSummary} from './utils';

const getDefaultFormState = (): FormState => ({
  isSubmitting: false,
  success: undefined,
  error: undefined,
  warning: undefined,
  errorSummary: {
    errorCount: 0,
    hasErrors: false,
  },
});
function useForm<FormValues>(params: {
  initialFormValues: FormValues;
  validators?: FieldValidators<FormValues>;
  opts?: {
    validateOnBlur?: boolean;
  };
}): UseForm<FormValues> {
  const {initialFormValues, validators, opts} = params;
  const {validateOnBlur} = {validateOnBlur: true, ...opts};
  const [formValues, setFormValue] = useState<FormValues>(initialFormValues);
  const [errors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setFieldTouched] = useState<FieldStatuses>({});
  // todo revisit this. Notifications should be separate. Make use of use reducer and use context
  const [formState, setFormState] = useState<FormState>(getDefaultFormState());
  const dirty = getDirtyFields<FormValues>(formValues, initialFormValues);

  // use useEffect so we dont have a race condition on validateField and validateForm methods.
  // We want errors to have been set before we update the errorsSummary using setFormState
  useEffect(() => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      errorSummary: getFieldErrorSummary(errors),
    }));
  }, [errors]);

  /* ------------------ Methods for handling individual fields. */
  const validateField = (e: FormEvent): boolean => {
    const {value, name, checked, type} = e.target as HTMLInputElement;

    const error =
      validators && validators[name]
        ? validators[name](type === 'checkbox' ? checked : value)
        : undefined;

    setFieldErrors((prevFieldErrors) => ({
      ...prevFieldErrors,
      [name]: error,
    }));

    return !error;
  };
  const handleChange = (e: FormEvent): void => {
    const {name, value, type, checked} = e.target as HTMLInputElement;
    setFormValue((prevFormValues) => ({
      ...prevFormValues,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (validateOnBlur && errors[name]) {
      validateField(e);
    }
  };
  const handleBlur = (e: FormEvent): void => {
    const {name} = e.target as HTMLInputElement;

    if (validateOnBlur) {
      validateField(e);
    }

    setFieldTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };
  // Set value of single or multiple fields without using handleChange
  const setFieldValues = (partialFormValues: Partial<FormValues>): void => {
    setFormValue((prevFormValues) => ({
      ...prevFormValues,
      ...partialFormValues,
    }));
  };
  // Get the props needed for a specific field
  // This is preferable from using higher order components or render props as these create a mess of nested components.
  const getFieldPropsFromForm = (
    id: string,
    optionalParams?: GetFieldPropsFromFormParams
  ): FieldPropsFromForm => {
    // We need name for radio groups,they share the same name so will have one error and one touched value for the group rather than individual radios
    const key = optionalParams?.name || id;
    return {
      id,
      touched: touched[key],
      error: errors[key],
      dirty: dirty[key],
      handleBlur,
      handleChange,
      ...optionalParams?.overrides,
    };
  };

  /* ------------------ Methods for handling form submission and form states. */
  const validateForm = (): boolean => {
    if (validators) {
      const {fieldErrors, errorSummary} = getFieldErrors<FormValues>(
        formValues,
        validators
      );

      setFieldErrors((prevFieldErrors) => ({
        ...prevFieldErrors,
        ...fieldErrors,
      }));

      if (errorSummary.hasErrors) {
        return false;
      }
    }

    return true;
  };
  // Set the state of the form to success. This success message is displayed on the success view.
  const setFormSubmitSuccess = (message: string): void => {
    setFormState((prevState) => ({
      ...prevState,
      isSubmitting: false,
      success: message,
      error: undefined,
      warning: undefined,
    }));
  };
  // Set the state of the form to error. This error object is displayed on the form.
  const setFormSubmitError = (error: string): void => {
    setFormState((prevState) => ({
      ...prevState,
      error,
      isSubmitting: false,
      success: undefined,
      warning: undefined,
    }));
  };
  // Set the state of the form to warning. This warning is displayed on the form.
  const setFormSubmitWarning = (warning: string): void => {
    setFormState((prevState) => ({
      ...prevState,
      warning,
      isSubmitting: false,
      success: undefined,
      error: undefined,
    }));
  };
  // Set the state of the form to submitting. This boolean is used to display a submitting view.
  const setFormIsSubmitting = (isSubmitting: boolean): void => {
    setFormState((prevState) => ({
      ...prevState,
      isSubmitting,
    }));
  };
  // Handles common submit scenarios. You may also define your own submit method and call the form states methods individually.
  const handleSubmit = async (
    submitMethod: () => Promise<string>,
    validateOnSubmit = true
  ): Promise<void> => {
    try {
      // Before trying to submit form to api, check form is valid
      if (validateOnSubmit && !validateForm()) {
        // Display warning message and early return
        setFormSubmitWarning('Form has errors, please check the fields.');
        return;
      }
      // Form is valid we try and submit to api
      setFormIsSubmitting(true);
      // Here we make a mock api call, we can set this to succeed or fail based on the fail checkbox
      const message = await submitMethod();
      // Set a success message from API
      setFormSubmitSuccess(message);
    } catch (ex) {
      // If api call fails we display error message
      setFormSubmitError(ex?.message);
    }
  };

  return {
    formMethods: {
      handleChange,
      handleBlur,
      setFieldValues,
      getFieldPropsFromForm,
      resetForm(): void {
        setFormValue(initialFormValues);
        setFormState(getDefaultFormState());
        setFieldTouched({});
        setFieldErrors({});
      },
      validateForm,
      setFormSubmitSuccess,
      setFormSubmitError,
      setFormSubmitWarning,
      setFormIsSubmitting,
      handleSubmit,
    },
    formValues,
    formState,
    fieldStates: {
      touched,
      errors,
      dirty,
    },
  };
}

export default useForm;
