import React from 'react';
import { useFormContext } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({ name, label, ...props }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <input
        {...register(name)}
        {...props}
        className="w-full border rounded px-3 py-2"
      />
      {errors[name] && <p className="text-red-500 text-sm">{String(errors[name]?.message)}</p>}
    </div>
  );
};

export default Input;
