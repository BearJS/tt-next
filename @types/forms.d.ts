interface FormState {
  isSubmitting: boolean;
  success?: string;
  error?: string;
  warning?: string;
  errorSummary: ErrorSummary;
}

type FormEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

// Leave key as [key: string] rather than [key: keyof typeof FormValues] so this is easier to pass to other components
type FieldErrors = {
  [key: string]: string | undefined;
};

type FieldStatuses = {
  [key: string]: boolean;
};

type FieldStates = {
  // A field is considered touched when the user has blurred off the field directly or off the field group (in the case of radio buttons)
  touched: FieldStatuses;
  // A field is considered dirty when its value / checked state (in the case of checkboxes) has changed from its initial value
  dirty: FieldStatuses;
  // A field will receive an error if the field fails its validator method. This check can be done either when the user blurs off the field or when the user submits the form, or both.
  errors: FieldErrors;
};

// https://stackoverflow.com/questions/53662208/types-from-both-keys-and-values-of-object-in-typescript
type FieldValidators<FormValues> = {
  [key: string]: (
    value: typeof FormValues[keyof typeof FormValues]
  ) => string | undefined;
};

type FormValue = string | boolean | number;

type FieldPropsFromForm = {
  handleChange: (e: FormEvent) => void;
  handleBlur: (e: FormEvent) => void;
  touched?: boolean;
  dirty?: boolean;
  error?: string;
  id: string;
};

type ErrorSummary = {
  errorCount: number;
  hasErrors: boolean;
};

type GetFieldPropsFromFormParams = {
  overrides?: Partial<FieldPropsFromForm>;
  name?: string;
};

interface FormMethods<FormValues> {
  handleChange: (e: FormEvent) => void;
  handleBlur: (e: FormEvent) => void;
  resetForm: () => void;
  validateForm: () => boolean;
  setFieldValues: (params: Partial<FormValues>) => void;
  setFormIsSubmitting: (isSubmitting: boolean) => void;
  setFormSubmitSuccess: (message: string) => void;
  setFormSubmitWarning: (message: string) => void;
  setFormSubmitError: (message: string) => void;
  handleSubmit: (submitMethod: () => Promise<string>, validateOnSubmit: boolean) => void;
  getFieldPropsFromForm: (
    id: string,
    params?: GetFieldPropsFromFormParams
  ) => FieldPropsFromForm;
}

type UseForm<FormValues> = {
  formValues: FormValues;
  fieldStates: FieldStates;
  formMethods: FormMethods<FormValues>;
  formState: FormState;
};

interface FieldStyleProps {
  disabled?: boolean;
  readOnly?: boolean;
}

interface FieldProps extends FieldStyleProps {
  label?: string;
  name?: string;
  required?: boolean;
  fieldPropsFromForm: FieldPropsFromForm;
  title?: string;
  description?: React.ReactFragment;
  error?: string;
}

interface InputProps<Value> extends FieldProps {
  value: Value;
  name?: string; // name is not needed for Select, TextArea and Input as we can use id
  placeholder?: string;
}

interface RadioButtonProps extends FieldProps {
  value?: string; // don't need value for radio buttons
  name: string;
  radioGroupValue: string;
}

interface CheckboxProps extends FieldProps {
  value?: string; // don't need value for checkboxes buttons
  checked: boolean;
  name?: string; // name not needed as can use id
}

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  title?: string;
  labelSuffix?: string;
}

interface SelectProps extends InputProps<string> {
  options: SelectOption[];
}

interface TextAreaProps extends InputProps<string> {
  rows?: number;
  cols?: number;
}

interface FieldsetStyleProps {
  inline?: boolean;
  disabled?: boolean;
}

interface FieldsetProps extends FieldsetStyleProps {
  legend: string;
}

interface ButtonStyleProps {
  informationPanel?: boolean;
  block?: boolean;
  flex?: boolean;
  mb?: boolean;
  mt?: boolean;
  mr?: boolean;
  ml?: boolean;
  disabled?: boolean;
  secondary?: boolean;
  anchor?: boolean;
}

interface ButtonProps extends ButtonStyleProps {
  handleClick: () => void;
  label?: string;
  title?: string;
  type?: 'button' | 'submit';
}
