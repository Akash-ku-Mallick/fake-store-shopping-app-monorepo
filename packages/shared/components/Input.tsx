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
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        {...register(name)}
        {...props}
        className="w-full border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-800 
                   text-gray-900 dark:text-gray-100 
                   rounded px-3 py-2 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                   transition-colors"
      />
      {errors[name] && (
        <p className="text-red-500 dark:text-red-400 text-sm mt-1">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
};

export default Input;
