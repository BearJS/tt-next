import {useState} from 'react';

function useForm<FormValues>(params: {
  initialFormValues: FormValues;
}): UseForm<FormValues> {
  const {initialFormValues} = params;
  const [formValues, setFormValue] = useState<FormValues>(initialFormValues);

  const handleChange = (e: FormEvent): void => {
    const {name, value, type, checked} = e.target as HTMLInputElement;
    setFormValue((prevFormValues) => ({
      ...prevFormValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return {
    handleChange,
    formValues,
  };
}

export default useForm;
