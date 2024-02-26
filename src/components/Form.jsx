/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import Button from './Button';

const Form = ({ onSubmit, fields }) => {
  const { handleSubmit, register, watch, formState: { errors } } = useForm();

  const password = watch('password', '')
  const validateConfirmPassword = (value) => {
    return value === password || 'Passwords must match';
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields &&
        fields.map((field) => (
          <div key={field.name}>
            <label>{field.label}</label>
            <input
              className={`px-3 py-2 bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${field.classes || ''}`}
              type={field.type || 'text'}
              placeholder={field.placeholder || ''}
              {...register(field.name, {
                ...field.rules,
                validate: field.name == 'confirm_password' ? validateConfirmPassword : undefined,
              })}
            />
            {errors[field.name] && (
              <p style={{ color: 'red' }}>{errors[field.name].message}</p>
            )}
          </div>
        ))}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
