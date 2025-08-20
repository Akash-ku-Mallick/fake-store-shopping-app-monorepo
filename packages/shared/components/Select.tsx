import React from 'react';
import ReactSelect from 'react-select';
import { useController, useFormContext } from 'react-hook-form';

interface SelectProps {
  name: string;
  label?: string;
  options: { label: string; value: string | number }[];
}

const Select: React.FC<SelectProps> = ({ name, label, options }) => {
  const { control } = useFormContext();
  const { field } = useController({ name, control });

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <ReactSelect {...field} options={options} />
    </div>
  );
};

export default Select;
