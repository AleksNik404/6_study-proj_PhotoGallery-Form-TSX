import { useFormContext } from 'react-hook-form';

import { FormData } from './Form';
import { ErrorMessage, InputBlock } from '../../../styled/smallComponents';
import { NAME_TOO_LONG_ERROR_MESSAGE } from '../../../utils/constants';

interface InputProps {
  name: keyof Pick<FormData, 'userName' | 'createdAt'>;
  label?: string;
  type?: string;
  placeholder?: string;

  validate?: (value: string | undefined) => string | undefined;
}

const FormInput = ({ name, label, placeholder, type = 'text', validate }: InputProps) => {
  const { register, formState } = useFormContext<FormData>();
  const { errors } = formState;

  const rules = {
    validate,
    maxLength: { value: 15, message: NAME_TOO_LONG_ERROR_MESSAGE },
  };

  return (
    <InputBlock>
      <label htmlFor={name}>
        {label}
        {errors[name] && <ErrorMessage>{errors[name]?.message}</ErrorMessage>}
      </label>
      <input
        {...register(name, rules)}
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete="off"
      />
    </InputBlock>
  );
};

export default FormInput;
