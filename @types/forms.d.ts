type FormEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

type UseForm<FormValues> = {
  formValues: FormValues;
  handleChange: (e: FormEvent) => void;
};

interface FieldStyleProps {
  disabled?: boolean;
  readOnly?: boolean;
}

interface InputProps<Value> extends FieldStyleProps {
  handleChange: (e: FormEvent) => void;
  handleBlur?: (e: FormEvent) => void;
  id: string;
  label?: string;
  name?: string;
  required?: boolean;
  title?: string;
  description?: React.ReactFragment;
  error?: string;
  value: Value;
  placeholder?: string;
  type?: 'text' | 'number' | 'password' | 'date';
  min?: string | number;
  max?: string | number;
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
